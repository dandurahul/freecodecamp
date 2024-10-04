import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IStoreCatalogueService } from "../../contracts/catalogues/i-store-catalogue.service";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { StoreCatalogueModel } from "../../../domain/models/catalogues/store-catalogue.model";
import { IStoreCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/store-catalogues.entity";
import { TransformOptions } from "../../constants/transform-options";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";
import { buildPaginationObject } from "../../builders/pagination.builder";
import { StoreCatalogueDetailsModel } from "../../../domain/models/catalogues/store-catalogue-details.model";
import { ISeoEntity } from "../../../infrastructure/repositories/entities/iseo.entity";
import { SeoModel } from "../../../domain/models/seo.model";
import {
  objectIdArrayToStringArray,
  removeUndefinedFromArray,
  validateArray,
} from "../../utils/filter-functions";
import { IStoreCatalogueVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue-variant.repository";
import { IStoreCataloguePurchaseVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-purchase-variant.repository";
import { ISeoRepository } from "../../../infrastructure/repositories/contracts/i-seo.repository";
import { StoreCatalogueVariantModel } from "../../../domain/models/catalogues/store-catalogue-variants.model";
import { IStoreCatalogueVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/store-catalogue-variants.entity";
import { StoreCataloguePurchaseVariantModel } from "../../../domain/models/catalogues/store-catalogue-purchase-variants.model";
import { IStoreCataloguePurchaseVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/store-purchase-variants.entity";
import { IGlobalCatalogueHelperService } from "../../contracts/helper/i-global-catalogue.helper.service";
import { IStoreCatalogueHelperService } from "../../contracts/helper/i-store-catalogue.helper.service";
import { StoreCatalogueFilterModel } from "../../../api/models/store-catalogue-product-filter.model";
import { AdvancedCatalogueFilterModel } from "../../../domain/models/catalogues/advanced-filter-reponse.model";
import { IGlobalCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { IGlobalCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/global-catalogues.entity";
import { FilterConstants } from "../../constants/filter.constants";
import { VariantRequestModel } from "../../../domain/models/catalogues/variant-update-request.model";
import { GlobalCatalogueDetailsModel } from "../../../domain/models/catalogues/global-catalogue-details.model";
import { buildQueryForBulkWrite } from "../../../infrastructure/repositories/builders/query.builder";
import FilterTypeEnum from "../../../infrastructure/enums/filter.enum";

@injectable()
class StoreCatalogueService implements IStoreCatalogueService {
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatelogueRepository!: IStoreCatalogueRepository;
  @inject(ContainerTypes.GlobalCatalogueRepository)
  private globalCatalogueRepository!: IGlobalCatalogueRepository;
  @inject(ContainerTypes.StoreCatalogueVariantRepository)
  private storeCatelogueVariantRepository!: IStoreCatalogueVariantRepository;
  @inject(ContainerTypes.StoreCataloguePurchaseVariantRepository)
  private purchaseVariantRepository!: IStoreCataloguePurchaseVariantRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.GlobalCatalogueHelpService)
  private globalCatalogueHelperService!: IGlobalCatalogueHelperService;
  @inject(ContainerTypes.StoreCatalogueHelperService)
  private storeCatalogueHelperService!: IStoreCatalogueHelperService;

  async createStoreCatalogue(
    storeCatalogueModel: StoreCatalogueModel
  ): Promise<StoreCatalogueModel> {
    let storeCatalogueEntity = instanceToPlain(storeCatalogueModel, {
      enableCircularCheck: true,
    }) as IStoreCatalogueEntity;

    storeCatalogueEntity.variants = await this.createOrUpdateVariants(
      storeCatalogueModel?.variants
    );

    storeCatalogueEntity.purchaseVariants =
      await this.createOrUpdatePurchaseVariants(
        storeCatalogueModel?.purchaseVariants
      );

    storeCatalogueEntity.seo = (
      await this.createOrUpdateSeo(storeCatalogueModel?.seo)
    )?.id;

    return plainToInstance(
      StoreCatalogueModel,
      await this.storeCatelogueRepository.createStoreCatalogue(
        storeCatalogueEntity
      ),
      TransformOptions.tranformOptions
    );
  }

  async createStoreCatalogueProducts(
    entityInternalId: string,
    productIds: string[],
    businessUnitId: string
  ): Promise<StoreCatalogueModel> {
    let globalCatalogueProducts = plainToInstance(
      GlobalCatalogueDetailsModel,
      await this.globalCatalogueRepository.filterGlobalCatalogues(
        {
          productIds,
          businessUnitId,
        },
        FilterTypeEnum.BY_PRODUCT_IDS
      ),
      TransformOptions.tranformOptions
    ) as any;
    let storeCatalogueProducts =
      await this.storeCatelogueRepository.filterStoreCatalogues({
        entityInternalId,
        productIds,
      });
    let catalogueProducts: IStoreCatalogueEntity[] =
      await this.buildStoreCatalogueProductsData(
        productIds,
        storeCatalogueProducts,
        globalCatalogueProducts,
        entityInternalId
      );
    return plainToInstance(
      StoreCatalogueModel,
      await this.storeCatelogueRepository.bulkInsert(catalogueProducts),
      TransformOptions.tranformOptions
    ) as unknown as StoreCatalogueModel;
  }

  private async buildStoreCatalogueProductsData(
    productIds: string[],
    storeCatalogueProducts: IStoreCatalogueEntity[],
    globalCatalogueProducts: IGlobalCatalogueEntity[],
    entityInternalId: string
  ) {
    let catalogueProducts: IStoreCatalogueEntity[] = [];
    //modify to productID
    for (const iterator of productIds) {
      let storeCatalogue = storeCatalogueProducts?.find((catalogue) => {
        return catalogue?.productId == iterator;
      });
      if (!storeCatalogue) {
        let globalCatalogue = globalCatalogueProducts?.find((item) => {
          return iterator == item?.productId;
        });
        if (globalCatalogue) {
          let catalogVariants: any = globalCatalogue?.variants?.map(
            ({ _doc }: any) => {
              delete _doc?._id;
              return _doc;
            }
          );

          let variants = await this.createOrUpdateVariants(catalogVariants);
          let storeCatalogueModel = {
            entityInternalId: entityInternalId,
            orderValue: globalCatalogue.orderValue,
            productId: iterator,
            globalCatalogue: globalCatalogue.id,
            variants,
            variantsCount: variants?.length || 0,
            highlights: globalCatalogue?.highlights?.length
              ? globalCatalogue.highlights?.map((element) => element.toString())
              : [],
            creationDate: new Date(),
          };
          let storeCatalogueEntity = instanceToPlain(storeCatalogueModel, {
            enableCircularCheck: true,
          }) as IStoreCatalogueEntity;
          catalogueProducts.push(storeCatalogueEntity);
        }
      }
    }
    return catalogueProducts;
  }

  fetchStoreCatalogueVariants(
    globalCatalogue: IGlobalCatalogueEntity | undefined
  ): any {
    return globalCatalogue?.variants?.map(
      ({ _id, id, ...variant }: any) => variant
    );
  }

  async getStoreCatalogues(
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<StoreCatalogueDetailsModel[]> {
    let storeCatalogues = plainToInstance(
      StoreCatalogueDetailsModel,
      await this.storeCatelogueRepository.filterStoreCatalogues(
        {},
        filterType,
        pageSize,
        page
      ),
      TransformOptions.tranformOptions
    ) as any;
    return storeCatalogues;
  }

  //find by id
  async getStoreCatalogueById(id: string): Promise<StoreCatalogueDetailsModel> {
    return plainToInstance(
      StoreCatalogueDetailsModel,
      await this.storeCatelogueRepository.getStoreCatalogue({
        _id: id,
      }),
      TransformOptions.tranformOptions
    );
  }

  async getStoreProduct(
    filterCriteria: Object,
    filterType: string | undefined
  ): Promise<StoreCatalogueDetailsModel> {
    return plainToInstance(
      StoreCatalogueDetailsModel,
      await this.storeCatelogueRepository.getStoreCatalogue(filterCriteria),
      TransformOptions.tranformOptions
    ) as any;
  }

  async updateStoreCatalogue(
    id: string,
    storeCatalogueModel: StoreCatalogueModel
  ): Promise<StoreCatalogueModel> {
    storeCatalogueModel.modifiedDate = new Date();
    let storeCatalogueEntity = instanceToPlain(
      storeCatalogueModel
    ) as IStoreCatalogueEntity;

    storeCatalogueEntity.variants = await this.createOrUpdateVariants(
      storeCatalogueModel?.variants
    );

    storeCatalogueEntity.purchaseVariants =
      await this.createOrUpdatePurchaseVariants(
        storeCatalogueModel?.purchaseVariants
      );

    storeCatalogueEntity.seo = (
      await this.createOrUpdateSeo(storeCatalogueModel?.seo)
    )?._id;

    return plainToInstance(
      StoreCatalogueModel,
      await this.storeCatelogueRepository.updateStoreCatalogue(
        id,
        storeCatalogueEntity
      ),
      TransformOptions.tranformOptions
    );
  }

  async deleteStoreCatalogue(id: string): Promise<any> {
    await this.storeCatelogueRepository.deleteStoreCatalogue(id);
    return {
      message: ErrorMessages.GLOBAL_CATALOGUE_DELETED_SUCCESSFULLY,
    };
  }

  async filterStoreCatalogue(
    filterType: string,
    filterCriteria: Object,
    pageSize: number,
    page: number
  ): Promise<any> {
    return await this.storeCatelogueRepository.filterStoreCatalogues(
      filterCriteria,
      filterType,
      pageSize,
      page
    );
  }

  async filterActiveStoreCatalogueProducts(
    entityInternalId: string | undefined,
    filterCriteria: StoreCatalogueFilterModel,
    filterType: string,
    pageSize: number,
    page: number,
    extendedCatalogFlag: boolean
  ): Promise<StoreCatalogueDetailsModel[]> {
    let { globalCatalogueProducts, breadCrumb }: any =
      await this.globalCatalogueHelperService.getGlobalCatalogueDetails(
        filterCriteria,
        extendedCatalogFlag,
        filterType
      );
    filterCriteria.entityInternalId = entityInternalId;
    let [storeProducts, categories, subCategories, classifications] =
      await this.storeCatalogueHelperService.getStoreCatalogueDetails(
        filterCriteria,
        globalCatalogueProducts,
        pageSize,
        page
      );
    let pagination = await this.filterByPagination(
      filterCriteria,
      pageSize,
      page
    );
    let storeCatalogueInfo = {
      storeProductInfo: { storeProducts, pagination },
      breadCrumb: breadCrumb,
      categories,
      subCategories,
      classifications,
    };
    return plainToInstance(
      AdvancedCatalogueFilterModel,
      storeCatalogueInfo,
      TransformOptions.tranformOptions
    ) as any;
  }

  createStoreCatalogues(
    catalogues: StoreCatalogueModel[]
  ): Promise<StoreCatalogueModel[]> {
    let catalogueEntity = instanceToPlain(
      catalogues
    ) as IStoreCatalogueEntity[];

    return plainToInstance(
      StoreCatalogueModel,
      this.storeCatelogueRepository.createStoreCatalogues(catalogueEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  updateStoreCatalogues(
    catalogueModels: StoreCatalogueModel[]
  ): Promise<StoreCatalogueModel[]> {
    let categoryEntity = instanceToPlain(
      catalogueModels
    ) as IStoreCatalogueEntity[];

    categoryEntity = buildQueryForBulkWrite(categoryEntity);

    return plainToInstance(
      StoreCatalogueModel,
      this.storeCatelogueRepository.updateStoreCatalogues(categoryEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  async filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel> {
    let count = await this.storeCatelogueRepository.filterByPagination(
      filterCriteria
    );
    return buildPaginationObject(count, pageSize);
  }

  private async createOrUpdateVariants(variants: StoreCatalogueVariantModel[]) {
    if (!variants?.length) return;
    let bulkVariants = instanceToPlain(
      variants
    ) as IStoreCatalogueVariantEntity[];
    let variantIds: any = bulkVariants?.map((variant: any) => variant?._id);
    let variantsResponse = await this.storeCatelogueVariantRepository.bulkWrite(
      variants
    );
    variantIds.push(...Object.values(variantsResponse.insertedIds));
    let filteredIds = variantIds?.filter((value: any) => value !== undefined);
    return objectIdArrayToStringArray(filteredIds);
  }

  private async createOrUpdatePurchaseVariants(
    variants: StoreCataloguePurchaseVariantModel[]
  ) {
    if (!variants || variants.length <= 0) return undefined;
    let catalogueVariants = instanceToPlain(
      variants
    ) as IStoreCataloguePurchaseVariantEntity[];
    let variantIds: any = catalogueVariants?.map(
      (variant: any) => variant?._id
    );
    let variantsResponse = await this.purchaseVariantRepository.bulkWrite(
      catalogueVariants
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

  async updateStoreCatalogueProducts(
    query: object,
    catalogueEntity: StoreCatalogueModel
  ): Promise<StoreCatalogueModel> {
    catalogueEntity.modifiedDate = new Date();
    let catalogueEntityEntity = instanceToPlain(
      catalogueEntity
    ) as IStoreCatalogueEntity;
    return (await this.storeCatelogueRepository.updateBulkStoreCatalogue(
      query,
      catalogueEntityEntity
    )) as any;
  }

  async updateProductVariants(requestObject: {
    storeProducts: VariantRequestModel[];
  }): Promise<StoreCatalogueVariantModel[]> {
    let storeVariants = requestObject?.storeProducts || [];
    const storeProducts =
      await this.storeCatelogueRepository.filterStoreCatalogues(
        {
          entityInternalIds: storeVariants?.map(
            (item) => item.entityInternalId
          ),
          productIds: storeVariants?.map((e) => e.productId),
        },
        FilterConstants.WITH_VARIANTS
      );
    let variants = instanceToPlain(
      await this.updateProductVariant(storeVariants, storeProducts),
      {
        enableCircularCheck: true,
      }
    ) as IStoreCatalogueVariantEntity[];
    return await this.storeCatelogueVariantRepository.bulkWrite(variants);
  }

  async updateProductVariant(
    variants: VariantRequestModel[],
    storeProducts: IStoreCatalogueEntity[]
  ): Promise<StoreCatalogueVariantModel[]> {
    let variantsToUpdate = variants?.map((variant) => {
      const {
        productVariantIndex,
        stockBalance = 0,
        price,
        type,
        productId,
        entityInternalId,
      } = variant;

      const storeProductVariants: any = storeProducts?.find(
        (e) =>
          e.productId == productId && e.entityInternalId == entityInternalId
      )?.variants;
      if (!storeProductVariants) return;
      let variantToUpdate: StoreCatalogueVariantModel =
        storeProductVariants.find(
          (e: StoreCatalogueVariantModel) =>
            e.productVariantIndex == productVariantIndex
        );
      let newVariant: Partial<StoreCatalogueVariantModel> = {};

      if (type === FilterConstants.STOCK_UPDATE) {
        newVariant.stockBalance = stockBalance >= 0 ? stockBalance : 0;
      } else if (type === FilterConstants.PRICE_UPDATE && price) {
        const { discount = 0, discountType = FilterConstants.VALUE_DISCOUNT } =
          variantToUpdate;
        const newSalesPrice =
          discountType === FilterConstants.PERCENTAGE_DISCOUNT
            ? price * (1 - discount / 100)
            : price - discount;
        newVariant.salesPrice = newSalesPrice;
        newVariant.price = price;
      }
      newVariant.id = variantToUpdate.id ?? variantToUpdate._id;
      return newVariant;
    });
    return removeUndefinedFromArray(variantsToUpdate);
  }

  async updateStoreCatalogueVariants(
    storeCatalogueEntity: StoreCatalogueModel[],
    filterType: string
  ): Promise<any> {
    if (filterType == "Bulk") {
      let bulk = await this.storeCatelogueVariantRepository.bulkWrite(
        storeCatalogueEntity
      );
      let ids = [
        ...storeCatalogueEntity.map((e) => e._id),
        ...Object.values(bulk.insertedIds),
      ].filter(Boolean);
      return await this.storeCatelogueVariantRepository.filterStoreCatalogueVariants(
        {
          _id: {
            $in: ids,
          },
        }
      );
    }

    if (filterType === FilterConstants.UPDATE_VARIANTS_BY_IDS) {
      return await this.storeCatelogueVariantRepository.bulkWrite(
        storeCatalogueEntity
      );
    }

    let variants: any = [];
    let catalogues: any = [];
    storeCatalogueEntity?.forEach((catalogue) => {
      catalogue.highlights &&
        catalogues.push({
          id: catalogue.id,
          highlights: catalogue.highlights,
          orderValue: catalogue.orderValue,
        });
      let variant = catalogue.variants || [];
      variants = [...variants, ...variant];
    });

    let bulkVariants = instanceToPlain(
      variants
    ) as IStoreCatalogueVariantEntity[];

    catalogues = buildQueryForBulkWrite(catalogues);
    catalogues.length &&
      (await this.storeCatelogueRepository.updateStoreCatalogues(catalogues));
    return await this.storeCatelogueVariantRepository.bulkWrite(bulkVariants);
  }
  async filterStoreCatalogueVariants(
    query: Object,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<any> {
    return this.storeCatelogueVariantRepository.filterStoreCatalogueVariants(
      query,
      fields,
      populate,
      aggregate,
      pageSize,
      page,
      sort
    );
  }
}

export default StoreCatalogueService;
