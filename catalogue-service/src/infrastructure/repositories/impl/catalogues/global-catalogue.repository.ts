import { inject, injectable } from "inversify";
import mongoose, { Types } from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IGlobalCatalogueRepository } from "../../contracts/catalogues/i-global-catalogue.repository";
import { IGlobalCatalogueEntity } from "../../entities/catalogues/global-catalogues.entity";
import {
  buildFilterForBusinessUnit,
  buildFilterObjectForGlobalCatalogues,
  getAggregateQueryForSuggestions,
} from "../../helpers/global-catalogues-filter.helper";
import { SubCategoryFilterModel } from "../../../../domain/models/catagories/filter/sub-category-filter.model";
import { ClassificationFilterModel } from "../../../../domain/models/catagories/filter/classification-filter.model";

@injectable()
class GlobalCatalogueRepository implements IGlobalCatalogueRepository {
  @inject(ContainerTypes.GlobalCatalogueRepositoryBase)
  private repositoryBase!: IRepositoryBase<IGlobalCatalogueEntity>;

  async createGlobalCatalogue(
    catalogue: IGlobalCatalogueEntity
  ): Promise<IGlobalCatalogueEntity> {
    return this.repositoryBase.create(catalogue);
  }

  async getGlobalCatalogue(query: any): Promise<IGlobalCatalogueEntity> {
    return await this.repositoryBase.findOne(
      query,
      "category subCategory classification variants purchaseVariants seo"
    );
  }
  async getAllGlobalCatalogues(
    query: any,
    fields: string,
    populate: string
  ): Promise<IGlobalCatalogueEntity[]> {
    return this.repositoryBase.find(query, fields, populate);
  }
  async updateGlobalCatalogue(
    id: string,
    catalogue: IGlobalCatalogueEntity
  ): Promise<IGlobalCatalogueEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      catalogue
    )) as IGlobalCatalogueEntity;
  }
  async deleteGlobalCatalogue(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterGlobalCatalogues(
    filterCriteria: any,
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<IGlobalCatalogueEntity[]> {
    if (filterType === "CATALOG_UPDATE") {
      return this.repositoryBase.filter(
        { variants: { $in: filterCriteria.variantIds } },
        "",
        'category subCategory classification variants',
        "",
        pageSize,
        page,
        ""
      );
    }
    let filter: any = buildFilterObjectForGlobalCatalogues(
      filterCriteria,
      filterType,
      page,
      pageSize
    );
    filter.filter = buildFilterForBusinessUnit(filterCriteria, filter?.filter);
    return this.repositoryBase.filter(
      filter?.filter ? filter.filter : {},
      filter?.fields,
      filter?.populate,
      filter?.aggregate,
      pageSize,
      page,
      filter?.sort
    );
  }
  async getSuggestionsForSearchCriteria(
    filterCriteria: Object,
    filterType: string
  ): Promise<IGlobalCatalogueEntity[]> {
    let filter: any = getAggregateQueryForSuggestions(
      filterCriteria,
      filterType
    );
    return this.repositoryBase.filter(
      filter?.filter,
      filter?.fields,
      undefined,
      filter?.aggregate || undefined
    );
  }

  createGlobalCatalogues(
    globalCatalogues: IGlobalCatalogueEntity[]
  ): Promise<IGlobalCatalogueEntity[]> {
    return this.repositoryBase.bulkInsert(globalCatalogues);
  }

  updateGlobalCatalogues(globalCatalogues: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(globalCatalogues);
  }

  async getProductCountsByCategory(filterCriteria: {
    businessUnitId: string;
  }): Promise<any> {
    let aggregate = [
      {
        $match: {
          deleteFlag: false,
          businessUnitId: new Types.ObjectId(filterCriteria.businessUnitId),
        },
      },
      {
        $group: {
          _id: "$category", // Group by categoryId
          productCount: { $sum: 1 }, // Count the number of products in each group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          categoryId: "$_id", // Rename _id to categoryId
          productCount: 1, // Include the productCount field
        },
      },
    ];
    return await this.repositoryBase.filter(
      {},
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }
  async getProductCountsBySubCategory(
    filterCriteria: SubCategoryFilterModel
  ): Promise<any> {
    let aggregate = [
      {
        $match: {
          deleteFlag: false,
          businessUnitId: new Types.ObjectId(filterCriteria.businessUnitId),
        },
      },
      {
        $group: {
          _id: "$subCategory", // Group by categoryId
          productCount: { $sum: 1 }, // Count the number of products in each group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          subCategoryId: "$_id", // Rename _id to categoryId
          productCount: 1, // Include the productCount field
        },
      },
    ];
    return await this.repositoryBase.filter(
      {},
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }

  async getProductCountsByClassification(
    filterCriteria: ClassificationFilterModel
  ): Promise<any> {
    let aggregate = [
      {
        $match: {
          deleteFlag: false,
          businessUnitId: new Types.ObjectId(filterCriteria.businessUnitId),
        },
      },
      {
        $group: {
          _id: "$classification", // Group by categoryId
          productCount: { $sum: 1 }, // Count the number of products in each group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          classificationId: "$_id", // Rename _id to categoryId
          productCount: 1, // Include the productCount field
        },
      },
    ];
    return await this.repositoryBase.filter(
      {},
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }

  filterByPagination(filterCriteria: any): Promise<any> {
    let filter: any = buildFilterObjectForGlobalCatalogues(filterCriteria);
    filter.filter = buildFilterForBusinessUnit(filterCriteria, filter?.filter);
    return this.repositoryBase.count(filter?.filter);
  }

  async updateBulkGlobalCatalogue(
    query: object,
    globalCatalogue: IGlobalCatalogueEntity
  ): Promise<IGlobalCatalogueEntity> {
    let filter = buildFilterObjectForGlobalCatalogues(query);
    return (await this.repositoryBase.updateMany(
      filter?.filter,
      globalCatalogue
    )) as IGlobalCatalogueEntity;
  }

  async groupByHighlightIds(
    highlightIds: string[],
    businessUnitId: string
  ): Promise<any> {
    let aggregate = [
      {
        $match: {
          deleteFlag: false,
          highlights: { $in: highlightIds },
          businessUnitId: new Types.ObjectId(businessUnitId),
        },
      },
      { $unwind: "$highlights" },
      {
        $group: {
          _id: "$highlights",
          productIds: { $addToSet: "$productId" },
          globalCatalogIds: { $addToSet: "$_id" },
        },
      },
      {
        $project: {
          _id: 0,
          highlightId: "$_id",
          productIds: 1,
          globalCatalogIds: 1,
        },
      },
    ];
    return await this.repositoryBase.filter(
      {},
      undefined,
      undefined,
      aggregate,
      0,
      0,
      undefined
    );
  }
}
export default GlobalCatalogueRepository;
