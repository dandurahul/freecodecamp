import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IGlobalCatalogueService } from "../../contracts/catalogues/i-global-catalogue.service";
import { IGlobalCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { GlobalCatalogueModel } from "../../../domain/models/catalogues/global-catalogue.model";
import { IGlobalCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/global-catalogues.entity";
import { GlobalCatalogueVariantModel } from "../../../domain/models/catalogues/global-catalogue-variants.model";
import { IGlobalCatalogueVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/global-catalogue-variants.entity";
import { IGlobalCatalogueVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-catalogue-variant.repository";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";
import { buildPaginationObject } from "../../builders/pagination.builder";
import { TransformOptions } from "../../constants/transform-options";
import { GlobalCatalogueDetailsModel } from "../../../domain/models/catalogues/global-catalogue-details.model";
import { objectIdArrayToStringArray } from "../../utils/filter-functions";
import { GlobalCataloguePurchaseVariantModel } from "../../../domain/models/catalogues/global-catalogue-purchase-variants.model";
import { IGlobalCataloguePurchaseVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/global-purchase-variants.entity";
import { IGlobalCataloguePurchaseVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-purchase-variant.repository";
import { SeoModel } from "../../../domain/models/seo.model";
import { ISeoEntity } from "../../../infrastructure/repositories/entities/iseo.entity";
import { ISeoRepository } from "../../../infrastructure/repositories/contracts/i-seo.repository";
import { CategoryModel } from "../../../domain/models/catagories/category.model";
import { SubCategoryModel } from "../../../domain/models/catagories/sub-category.model";
import { ClassificationModel } from "../../../domain/models/catagories/classification.model";
import { FilterConstants } from "../../constants/filter.constants";
import { checkForSearchCriteria } from "../../../infrastructure/repositories/helpers/global-catalogues-filter.helper";
import { buildQueryForBulkWrite } from "../../../infrastructure/repositories/builders/query.builder";
import { IExtendedCatalogueHelperService } from "../../contracts/helper/i-extended-catalogue-product.helper.service";

@injectable()
class GlobalCatalogueService implements IGlobalCatalogueService {
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatelogueRepository!: IGlobalCatalogueRepository;
  @inject(ContainerTypes.GlobalCatalogueVariantRepository)
  private globalCatelogueVariantRepository!: IGlobalCatalogueVariantRepository;
  @inject(ContainerTypes.GlobalCataloguePurchaseVariantRepository)
  private purchaseVariantRepository!: IGlobalCataloguePurchaseVariantRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.ExtendedCatalogueHelperService)
  private extendedGlobalCatalogHelperService!: IExtendedCatalogueHelperService;

  async createGlobalCatalogue(
    globalCatalogueModel: GlobalCatalogueModel
  ): Promise<GlobalCatalogueModel> {
    let globalCatalogueEntity = instanceToPlain(globalCatalogueModel, {
      enableCircularCheck: true,
    }) as IGlobalCatalogueEntity;

    globalCatalogueEntity.variants =
      (await this.createOrUpdateVariants(globalCatalogueModel?.variants)) || [];

    globalCatalogueEntity.purchaseVariants =
      (await this.createOrUpdatePurchaseVariants(
        globalCatalogueModel?.purchaseVariants
      )) || [];

    let seoEntity = await this.createOrUpdateSeo(globalCatalogueModel?.seo);
    globalCatalogueEntity.seo = seoEntity?.id;
    let globalCatelogueResponse =
      await this.globalCatelogueRepository.createGlobalCatalogue(
        globalCatalogueEntity
      );

    return plainToInstance(
      GlobalCatalogueModel,
      globalCatelogueResponse,
      TransformOptions.tranformOptions
    ) as any;
  }

  createGlobalCatalogueInBulk(
    catalogues: GlobalCatalogueModel[]
  ): Promise<GlobalCatalogueModel[]> {
    let catalogueEntity = instanceToPlain(
      catalogues
    ) as IGlobalCatalogueEntity[];

    return plainToInstance(
      GlobalCatalogueModel,
      this.globalCatelogueRepository.createGlobalCatalogues(catalogueEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  async getAllGlobalCatalogue(
    filterType: string,
    pageSize: number,
    page: number,
    filterCriteria: any
  ): Promise<GlobalCatalogueDetailsModel[]> {
    return plainToInstance(
      GlobalCatalogueDetailsModel,
      await this.globalCatelogueRepository.filterGlobalCatalogues(
        filterCriteria,
        filterType,
        pageSize,
        page
      ),
      TransformOptions.tranformOptions
    ) as any;
  }

  async getGlobalCatalogueById(
    id: string
  ): Promise<GlobalCatalogueDetailsModel> {
    return plainToInstance(
      GlobalCatalogueDetailsModel,
      await this.globalCatelogueRepository.getGlobalCatalogue({
        _id: id,
      }),
      TransformOptions.tranformOptions
    );
  }

  async updateGlobalCatalogue(
    id: string,
    globalCatalogueModel: GlobalCatalogueModel
  ): Promise<GlobalCatalogueModel> {
    let globalCatalogueEntity = instanceToPlain(globalCatalogueModel, {
      enableCircularCheck: true,
    }) as IGlobalCatalogueEntity;
    globalCatalogueEntity.modifiedDate = new Date();

    globalCatalogueEntity.variants =
      (await this.createOrUpdateVariants(globalCatalogueModel?.variants)) ||
      undefined;
    globalCatalogueEntity.variantsCount =
      globalCatalogueEntity.variants?.length || 0;
    globalCatalogueEntity.purchaseVariants =
      (await this.createOrUpdatePurchaseVariants(
        globalCatalogueModel?.purchaseVariants
      )) || [];

    let seoEntity = await this.createOrUpdateSeo(globalCatalogueModel?.seo);
    globalCatalogueEntity.seo = seoEntity?.id;

    return plainToInstance(
      GlobalCatalogueModel,
      await this.globalCatelogueRepository.updateGlobalCatalogue(
        id,
        globalCatalogueEntity
      ),
      TransformOptions.tranformOptions
    );
  }

  async deleteGlobalCatalogue(id: string): Promise<any> {
    await this.globalCatelogueRepository.deleteGlobalCatalogue(id);
    return {
      message: ErrorMessages.GLOBAL_CATALOGUE_DELETED_SUCCESSFULLY,
    };
  }

  async filterGlobalCatalogue(
    filterCriteria: Object,
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<GlobalCatalogueDetailsModel[]> {
    let globalCatalogueProducts: any =
      await this.globalCatelogueRepository.filterGlobalCatalogues(
        filterCriteria,
        filterType,
        pageSize,
        page
      );

    return plainToInstance(
      GlobalCatalogueDetailsModel,
      globalCatalogueProducts,
      TransformOptions.tranformOptions
    ) as any;
  }

  async getSuggestionsForSearchCriteria(
    filterCriteria: Object,
    filterType: string
  ): Promise<CategoryModel[] | SubCategoryModel[] | ClassificationModel[]> {
    let globalCatalogueDetails =
      await this.globalCatelogueRepository.getSuggestionsForSearchCriteria(
        filterCriteria,
        filterType
      );

    return filterType === FilterConstants.productIds
      ? (plainToInstance(
          GlobalCatalogueDetailsModel,
          globalCatalogueDetails,
          TransformOptions.tranformOptions
        ) as any)
      : this.extractCategorizationData(globalCatalogueDetails, filterCriteria);
  }

  async extractCategorizationData(
    globalCatalogueData: any[],
    filterCriteria: any
  ): Promise<CategoryModel[] | SubCategoryModel[] | ClassificationModel[]> {
    const { categoryName, subCategoryName, classificationName } =
      filterCriteria;

    const extractAndFlatten = (field: string) =>
      globalCatalogueData.map((item: any) => item[field]).flat();

    const conditions = [
      { condition: categoryName, action: "category" },
      { condition: subCategoryName, action: "subCategory" },
      { condition: classificationName, action: "classification" },
    ];
    const selectedCondition = conditions.find(
      (condition) => condition.condition
    );
    const result = selectedCondition
      ? extractAndFlatten(selectedCondition.action)
      : [];
    return result;
  }

  async createGlobalCatalogues(
    catalogues: GlobalCatalogueDetailsModel[]
  ): Promise<GlobalCatalogueDetailsModel[]> {
    let insertedCatalogues: any[] = [];
    let catalogueEntities = instanceToPlain(
      catalogues
    ) as IGlobalCatalogueEntity[];
    for (const iterator of catalogueEntities) {
      const variants: any = iterator?.variants;
      let bulkVariants = instanceToPlain(
        variants
      ) as IGlobalCatalogueVariantEntity[];
      let insertedVariants =
        await this.globalCatelogueVariantRepository.bulkInsert(bulkVariants);
      let insertedIds: any = insertedVariants?.map(
        (variant: any) => variant._id
      );
      iterator.variants = insertedIds;
      let globalCatalogue =
        await this.globalCatelogueRepository.createGlobalCatalogue(iterator);
      this.extendedGlobalCatalogHelperService.updateExtendedCatalogueProducts(
        iterator.subCategory,
        iterator.classification,
        iterator.classification
          ? FilterConstants.CLASSIFICATION
          : FilterConstants.SUB_CATEGORY
      );
      insertedCatalogues.push(
        plainToInstance(GlobalCatalogueModel, globalCatalogue) as any
      );
    }
    return insertedCatalogues;
  }

  updateGlobalCatalogues(
    catalogueModels: GlobalCatalogueModel[]
  ): Promise<GlobalCatalogueModel[]> {
    let categoryEntity = instanceToPlain(
      catalogueModels
    ) as IGlobalCatalogueEntity[];

    return plainToInstance(
      GlobalCatalogueModel,
      this.globalCatelogueRepository.updateGlobalCatalogues(categoryEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  async filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel> {
    let shouldSearchValues = checkForSearchCriteria(filterCriteria);
    if (shouldSearchValues === true) {
      let globalCatalogueProducts: any =
        await this.globalCatelogueRepository.filterGlobalCatalogues(
          filterCriteria,
          FilterConstants.PAGINATION,
          pageSize,
          page
        );
      let pageCountData = buildPaginationObject(
        globalCatalogueProducts?.[0]?.count,
        pageSize
      );
      return plainToInstance(PaginationModel, pageCountData) as any;
    } else {
      let productCount =
        await this.globalCatelogueRepository.filterByPagination(filterCriteria);
      let pageCountData = buildPaginationObject(productCount, pageSize);
      return plainToInstance(PaginationModel, pageCountData) as any;
    }
  }

  private async createOrUpdateVariants(
    variants: GlobalCatalogueVariantModel[]
  ) {
    if (!variants?.length) return;
    let bulkVariants = instanceToPlain(
      variants
    ) as IGlobalCatalogueVariantEntity[];
    let variantIds = bulkVariants?.map((item: any) => item?._id);
    let variantsResponse =
      await this.globalCatelogueVariantRepository.bulkWrite(bulkVariants);
    variantIds.push(
      ...Object.values(variantsResponse?.insertedIds),
      ...Object.values(variantsResponse?.upsertedIds)
    );
    let filteredIds = variantIds?.filter((value: any) => value !== undefined);
    return objectIdArrayToStringArray(filteredIds);
  }

  private async createOrUpdatePurchaseVariants(
    variants: GlobalCataloguePurchaseVariantModel[]
  ) {
    if (!variants?.length) return undefined;
    let bulkVariants = instanceToPlain(
      variants
    ) as IGlobalCataloguePurchaseVariantEntity[];
    let variantIds = bulkVariants?.map((item: any) => item?._id);
    let variantsResponse = await this.purchaseVariantRepository.bulkWrite(
      bulkVariants
    );
    variantIds.push(...Object.values(variantsResponse?.insertedIds));
    let filteredIds = variantIds?.filter((value: any) => value !== undefined);
    return objectIdArrayToStringArray(filteredIds);
  }

  private async createOrUpdateSeo(
    seoModel: SeoModel | undefined
  ): Promise<SeoModel | undefined> {
    if (
      !seoModel ||
      (!seoModel.title &&
        !seoModel.description &&
        !seoModel.keywords &&
        !seoModel.url)
    )
      return undefined;
    let seoEntity = instanceToPlain(seoModel) as ISeoEntity;
    if (seoEntity?._id) {
      return this.seoRepository.updateSeo(seoEntity._id, seoEntity);
    }
    let seo = await this.seoRepository.createSeo(seoEntity);
    return plainToInstance(SeoModel, seo);
  }

  async updateBulkStoreCatalogue(
    query: object,
    catalogueEntity: GlobalCatalogueModel
  ): Promise<GlobalCatalogueModel> {
    catalogueEntity.modifiedDate = new Date();
    let catalogueEntityEntity = instanceToPlain(
      catalogueEntity
    ) as IGlobalCatalogueEntity;

    let storeCatalogue =
      await this.globalCatelogueRepository.updateBulkGlobalCatalogue(
        query,
        catalogueEntityEntity
      );
    return storeCatalogue as any;
  }

  async updateBulkVarinats(
    catalogueEntity: GlobalCatalogueModel[],
    filterType?: string
  ): Promise<any> {
    if (filterType == "Bulk") {
      let bulk = await this.globalCatelogueVariantRepository.bulkWrite(
        catalogueEntity
      );
      let ids = [
        ...catalogueEntity.map((e) => e._id),
        ...Object.values(bulk.insertedIds),
      ].filter(Boolean);
      return await this.globalCatelogueVariantRepository.filterGlobalCatalogueVariants(
        {
          _id: {
            $in: ids,
          },
        }
      );
    }

    // need to remove this after changes of bulk update in global catalogue for stock by ids
    // temporary solution for import export variants create issue
    if (filterType == "Bulk_By_Id") {
      let bulk = await this.globalCatelogueVariantRepository.bulkWriteById(
        catalogueEntity
      );
      let ids = [
        ...catalogueEntity.map((e) => e._id),
        ...Object.values(bulk.insertedIds),
      ].filter(Boolean);
      return await this.globalCatelogueVariantRepository.filterGlobalCatalogueVariants(
        {
          _id: {
            $in: ids,
          },
        }
      );
    }

    if (filterType === FilterConstants.UPDATE_VARIANTS_BY_IDS) {
      return await this.globalCatelogueVariantRepository.bulkWriteById(
        catalogueEntity
      );
    }

    let catalogues: any = [];
    let variants: any = [];
    catalogueEntity?.forEach((catalogue) => {
      let variant = catalogue.variants || [];
      variants = [...variants, ...variant];
      catalogues.push({
        id: catalogue.id,
        highlights: catalogue.highlights,
        orderValue: catalogue.orderValue,
      });
    });
    let bulkVariants = instanceToPlain(
      variants
    ) as IGlobalCatalogueVariantEntity[];

    catalogues = buildQueryForBulkWrite(catalogues);
    await this.globalCatelogueRepository.updateGlobalCatalogues(catalogues);
    return await this.globalCatelogueVariantRepository.bulkWrite(bulkVariants);
  }

  async updateBulkCatalogProduct(
    catalogueEntity: GlobalCatalogueModel[]
  ): Promise<any> {
    let catalogues = catalogueEntity?.map((catalogue) => {
      const { id, _id, ...updateData } = catalogue;
      let catalogueId = id || _id;
      if (catalogueId) {
        return {
          updateOne: {
            filter: { _id: catalogueId },
            update: { $set: updateData },
          },
        };
      } else {
        return {
          insertOne: {
            document: catalogue,
          },
        };
      }
    });
    return await this.globalCatelogueRepository.updateGlobalCatalogues(
      catalogues
    );
  }
}

export default GlobalCatalogueService;
