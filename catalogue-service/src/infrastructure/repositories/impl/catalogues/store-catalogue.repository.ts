import { inject, injectable } from "inversify";
import mongoose, { Types } from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IStoreCatalogueRepository } from "../../contracts/catalogues/i-store-catalogue.repository";
import { IStoreCatalogueEntity } from "../../entities/catalogues/store-catalogues.entity";
import {
  buildFilterObjectForStoreCatalogues,
  buildPopulateWithVariants,
} from "../../helpers/store-catalogues-filter.helper";
import { FilterConstants } from "../../../../application/constants/filter.constants";

@injectable()
class StoreCatalogueRepository implements IStoreCatalogueRepository {
  @inject(ContainerTypes.StoreCatalogueRepositoryBase)
  private repositoryBase!: IRepositoryBase<IStoreCatalogueEntity>;

  async createStoreCatalogue(
    catalogue: IStoreCatalogueEntity
  ): Promise<IStoreCatalogueEntity> {
    return this.repositoryBase.create(catalogue);
  }

  async getStoreCatalogue(query: any): Promise<IStoreCatalogueEntity> {
    let populate: string = buildPopulateWithVariants() as any;
    query.deleteFlag = false;
    return await this.repositoryBase.findOne(query, populate);
  }
  async getAllStoreCatalogues(query: any): Promise<IStoreCatalogueEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateStoreCatalogue(
    id: string,
    catalogue: IStoreCatalogueEntity
  ): Promise<IStoreCatalogueEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogue
    )) as IStoreCatalogueEntity;
  }
  async deleteStoreCatalogue(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterStoreCatalogues(
    filterCriteria: any,
    filterType: string,
    pageSize: number,
    page: number,
    fetchType?: string | undefined
  ): Promise<any> {

    if (filterType === "CATALOG_UPDATE") {
      return this.repositoryBase.filter(
        { variants: { $in: filterCriteria.variantIds } },
        "",
        'globalCatalogue highlights purchaseVariants variants seo',
        "",
        pageSize,
        page,
        ""
      );
    }

    let filter = buildFilterObjectForStoreCatalogues(
      filterCriteria,
      filterType,
      fetchType
    );
    let productCount = {};
    // if (filterType == FilterConstants.CHECK_WITH_VARIANT) {
    //   let countAgg = [...filter?.aggregate, { $count: "totalDocuments" }];
    //   productCount = await this.repositoryBase.filter(
    //     filter?.filter ? filter.filter : {},
    //     filter?.fields,
    //     filter?.populate,
    //     countAgg
    //   );
    // }

    if (filter?.aggregate && page && pageSize) {
      const skipStage: any = { $skip: (page - 1) * pageSize };
      const limitStage: any = { $limit: pageSize };
      filter?.aggregate.push(skipStage, limitStage);
    }
    let result = await this.repositoryBase.filter(
      filter?.filter ? filter.filter : {},
      filter?.fields,
      filter?.populate,
      filter?.aggregate,
      pageSize,
      page,
      filter?.sort
    );

    if (filterType == FilterConstants.CHECK_WITH_VARIANT) {
      return {
        storeProducts: result,
        productCount: result.length,
      };
    }

    return result;
  }

  createStoreCatalogues(
    storeCatalogues: IStoreCatalogueEntity[]
  ): Promise<IStoreCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogues);
  }

  updateStoreCatalogues(storeCatalogues: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(storeCatalogues);
  }

  filterByPagination(filterCriteria: any): Promise<any> {
    let filter = buildFilterObjectForStoreCatalogues(filterCriteria);
    return this.repositoryBase.count(filter?.filter);
  }

  getProductCountBasedOnStores(filterCriteria: any): Promise<any> {
    let aggregate = [
      { $match: { deleteFlag: false } },
      {
        $addFields: {
          entityInternalId: { $toString: "$entityInternalId" },
        },
      },
      {
        $group: {
          _id: "$entityInternalId",
          objectIds: { $addToSet: "$_id" },
          productsCount: { $sum: 1 },
        },
      },
      {
        $project: {
          entityInternalId: { $toString: "$_id" },
          productsCount: 1,
          _id: 1,
        },
      },
    ];
    return this.repositoryBase.filter(
      {},
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }

  fetchUnsyncedHighlightIds(
    highlightIds: any,
    productIds: Types.ObjectId[]
  ): Promise<any> {
    const objectIdArray =
      highlightIds?.map((id: string) => new Types.ObjectId(id)) || [];
    let aggregate = [
      {
        $match: {
          deleteFlag: false,
          highlights: { $not: { $all: objectIdArray } },
          productId: { $in: productIds },
        },
      },
      {
        $project: {
          _id: 0,
          highlightIds: "$highlights",
        },
      },
      {
        $unwind: "$highlightIds",
      },
      {
        $group: {
          _id: null,
          highlightIds: { $addToSet: "$highlightIds" },
        },
      },
      {
        $project: {
          _id: 0,
          highlightIds: 1,
        },
      },
    ];

    return this.repositoryBase.filter(
      {},
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }

  fetchUnsyncedHighlightIdsBasedOnProductIds(
    data: [
      {
        productIds: string[];
        highlightId: string;
        globalCatalogIds: string[];
      }
    ]
  ): Promise<any> {
    let allProductIds = data.flatMap((e) => e.productIds);
    let allGlobalProductIds = data.flatMap((e) => e.globalCatalogIds);
    let aggregate: any = [
      {
        $match: {
          deleteFlag: false,
          productId: { $in: allProductIds },
          globalCatalogue: { $in: allGlobalProductIds },
        },
      },
    ];

    if (data.length) {
      aggregate.push({
        $facet: {},
      });

      data.forEach((key) => {
        aggregate[1].$facet[`${key.highlightId}`] = [
          {
            $match: {
              highlights: { $nin: [key.highlightId] },
              productId: { $in: key.productIds },
            },
          },
          {
            $project: {
              _id: 1,
              highlight: key.highlightId,
            },
          },
        ];
      });
    }

    return this.repositoryBase.filter(
      {},
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }

  getUnsyncedProductBasedOnStores(
    highlightId: string,
    productIds: Types.ObjectId[]
  ): Promise<any> {
    let aggregate = [
      {
        $match: {
          deleteFlag: false,
          highlights: { $not: { $all: [new Types.ObjectId(highlightId)] } },
          productId: { $in: productIds },
        },
      },
      {
        $group: {
          _id: "$entityInternalId",
          products: { $push: "$$ROOT" },
        },
      },
    ];

    return this.repositoryBase.filter(
      {},
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }

  async updateBulkStoreCatalogue(
    query: object,
    storeCatalogue: IStoreCatalogueEntity
  ): Promise<IStoreCatalogueEntity> {
    let filter = buildFilterObjectForStoreCatalogues(query);
    return (await this.repositoryBase.updateMany(
      filter?.filter || {},
      storeCatalogue
    )) as IStoreCatalogueEntity;
  }

  bulkInsert(
    storeCatalogue: IStoreCatalogueEntity[]
  ): Promise<IStoreCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(storeCatalogue);
  }

  async getAccumulatedStoreStocks(): Promise<any> {
    let aggregate = [
      {
        $lookup: {
          from: "StoreCatalogueVariant",
          localField: "variants",
          foreignField: "_id",
          as: "variants",
        },
      },
      {
        $unwind: {
          path: "$variants",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "GlobalCatalog",
          localField: "globalCatalogue",
          foreignField: "_id",
          as: "globalCatalogue",
        },
      },
      {
        $unwind: {
          path: "$globalCatalogue",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$variants.itemCode",
          productId: { $first: "$productId" },
          businessUnitId: { $first: "$globalCatalogue.businessUnitId" },
          stores: {
            $push: {
              entityInternalId: "$entityInternalId",
              stockBalance: "$variants.stockBalance",
              stockType: "$variants.stockType",
            },
          },
          totalStock: { $sum: "$variants.stockBalance" }
        },
      },
      {
        $project: {
          _id: false,
          itemCode: "$_id",
          productId: 1,
          businessUnitId: 1,
          stores: 1,
          totalStock: 1,
        },
      },
    ];
    return this.repositoryBase.filter({}, undefined, undefined, aggregate);
  }
}
export default StoreCatalogueRepository;
