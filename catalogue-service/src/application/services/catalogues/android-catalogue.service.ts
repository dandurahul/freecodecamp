import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IAndroidCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-android-catalogue.repository";
import { IAndroidCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/android-catalogue.entity";
import { TransformOptions } from "../../constants/transform-options";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";
import { buildPaginationObject } from "../../builders/pagination.builder";
import { StoreCatalogueDetailsModel } from "../../../domain/models/catalogues/store-catalogue-details.model";
import { ISeoEntity } from "../../../infrastructure/repositories/entities/iseo.entity";
import { SeoModel } from "../../../domain/models/seo.model";

import { ISeoRepository } from "../../../infrastructure/repositories/contracts/i-seo.repository";
import { StoreCatalogueVariantModel } from "../../../domain/models/catalogues/store-catalogue-variants.model";
import { StoreCataloguePurchaseVariantModel } from "../../../domain/models/catalogues/store-catalogue-purchase-variants.model";
import { IGlobalCatalogueHelperService } from "../../contracts/helper/i-global-catalogue.helper.service";
import { StoreCatalogueFilterModel } from "../../../api/models/store-catalogue-product-filter.model";
import { AdvancedCatalogueFilterModel } from "../../../domain/models/catalogues/advanced-filter-reponse.model";
import FilterTypeEnum from "../../../infrastructure/enums/filter.enum";
import { FilterConstants } from "../../constants/filter.constants";
import { VariantRequestModel } from "../../../domain/models/catalogues/variant-update-request.model";
import { IAndroidCatalogueVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-android-variant.repository";
import { IAndroidCataloguePurchaseVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-android-purchase-variant.repository";
import { IAndroidCatalogueHelperService } from "../../contracts/helper/i-android-catalogue.helper.service";
import { IAndroidCatalogueVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/android-catalogue-variant.entity";
import { IAndroidCataloguePurchaseVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/android-catalogue-purchase-variant.entity";
import { CatalogueModel } from "../../../domain/models/catalogues/catalogue.model";
import { ICatalogueService } from "../../contracts/catalogues/i-catalogue.service";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { IStoreCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/store-catalogues.entity";
import { updateProductVariant } from "../../builders/store-catalogue.builder";
import {
  validateArray,
  objectIdArrayToStringArray,
} from "../../utils/filter-functions";

@injectable()
class AndroidCatalogueService implements ICatalogueService {
  @inject(ContainerTypes.AndroidCatalogueRepository)
  private androidCatalogueRepository!: IAndroidCatalogueRepository;
  @inject(ContainerTypes.AndroidCatalogueVariantRepository)
  private androidCatalogueVariantRepository!: IAndroidCatalogueVariantRepository;
  @inject(ContainerTypes.AndroidCataloguePurchaseVariantRepository)
  private purchaseVariantRepository!: IAndroidCataloguePurchaseVariantRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.GlobalCatalogueHelpService)
  private globalCatalogueHelperService!: IGlobalCatalogueHelperService;
  @inject(ContainerTypes.AndroidCatalogueHelperService)
  private androidCatalogueHelperService!: IAndroidCatalogueHelperService;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;

  async createCatalogue(
    androidCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    let variants = await this.createOrUpdateVariants(
      androidCatalogueModel?.variants
    );
    androidCatalogueModel.variants = variants ? variants : undefined;
    let purchaseVarients = await this.createOrUpdatePurchaseVariants(
      androidCatalogueModel?.purchaseVariants
    );
    androidCatalogueModel.purchaseVariants = purchaseVarients
      ? purchaseVarients
      : undefined;
    let catalogueSeo = await this.createOrUpdateSeo(androidCatalogueModel?.seo);
    androidCatalogueModel.seo = catalogueSeo?._id;

    androidCatalogueModel.creationDate = new Date();
    androidCatalogueModel.modifiedDate = new Date();
    let androidCatalogueEntity = instanceToPlain(androidCatalogueModel, {
      enableCircularCheck: true,
    }) as IAndroidCatalogueEntity;

    let androidCatalogueResponse =
      await this.androidCatalogueRepository.createAndroidCatalogue(
        androidCatalogueEntity
      );
    return plainToInstance(
      CatalogueModel,
      androidCatalogueResponse,
      TransformOptions.tranformOptions
    );
  }

  async createCatalogueProducts(
    entityInternalId: string,
    productIds: string[]
  ): Promise<CatalogueModel> {
    try {
      let storeCatalogueProducts =
        await this.storeCatalogueRepository.filterStoreCatalogues(
          {
            entityInternalId: entityInternalId,
            productIds: productIds,
          },
          FilterConstants.WITH_VARIANTS
        );

      storeCatalogueProducts = plainToInstance(
        StoreCatalogueDetailsModel,
        storeCatalogueProducts,
        TransformOptions.tranformOptions
      ) as any;
      let androidCatalogueProducts =
        await this.androidCatalogueRepository.filterAndroidCatalogues({
          entityInternalId,
          productIds,
        });
      let androidCatalogueProduct: IAndroidCatalogueEntity[] =
        await this.buildAndroidCatalogueProductsData(
          productIds,
          androidCatalogueProducts,
          storeCatalogueProducts,
          entityInternalId
        );
      let androidCatalogueResponse =
        await this.androidCatalogueRepository.bulkInsert(
          androidCatalogueProduct
        );
      return plainToInstance(
        CatalogueModel,
        androidCatalogueResponse,
        TransformOptions.tranformOptions
      ) as unknown as CatalogueModel;
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }

  private async buildAndroidCatalogueProductsData(
    productIds: string[],
    androidCatalogueProducts: IAndroidCatalogueEntity[],
    storeCatalogueProducts: IStoreCatalogueEntity[],
    entityInternalId: string
  ) {
    try {
      let catalogueProducts: IAndroidCatalogueEntity[] = [];
      //modify to productID
      for (const iterator of productIds) {
        let androidCatalogue = androidCatalogueProducts?.find((catalogue) => {
          return catalogue?.productId == iterator;
        });

        if (!androidCatalogue) {
          let storeCatalogue: any = storeCatalogueProducts?.find((item) => {
            return iterator == item?.productId;
          });
          if (storeCatalogue) {
            let catalogVariants: any = [];
            storeCatalogue?.variants?.forEach(({ _id, ...rest }: any) => {
              delete rest._doc._id;
              catalogVariants.push(rest._doc);
            });
            let variants = await this.createOrUpdateVariants(catalogVariants);
            let androidCatalogue = {
              entityInternalId: entityInternalId,
              productId: iterator,
              storeCatalogue: storeCatalogue.id,
              globalCatalogue: String(storeCatalogue.globalCatalogue?._id),
              variants,
              variantsCount: variants?.length ?? 0,
              highlights: storeCatalogue?.highlights?.length
                ? validateArray(storeCatalogue.highlights)
                : [],
              creationDate: new Date(),
            };
            let androidCatalogueEntity = instanceToPlain(androidCatalogue, {
              enableCircularCheck: true,
            }) as IAndroidCatalogueEntity;

            catalogueProducts.push(androidCatalogueEntity);
          }
        }
      }
      return catalogueProducts;
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }

  async getCatalogues(
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<CatalogueModel[]> {
    try {
      let androidCatalogues = plainToInstance(
        CatalogueModel,
        await this.androidCatalogueRepository.filterAndroidCatalogues(
          {},
          filterType,
          pageSize,
          page
        ),
        TransformOptions.tranformOptions
      ) as any;
      return androidCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel> {
    let count = await this.androidCatalogueRepository.filterByPagination(
      filterCriteria
    );
    return buildPaginationObject(count, pageSize);
  }

  //find by id
  async getCatalogueById(_id: string): Promise<CatalogueModel> {
    try {
      let androidCatalogue =
        await this.androidCatalogueRepository.getAndroidCatalogue({
          _id,
        });
      return plainToInstance(
        CatalogueModel,
        androidCatalogue,
        TransformOptions.tranformOptions
      );
    } catch (e) {
      throw e;
    }
  }

  async updateCatalogue(
    id: string,
    androidCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    androidCatalogueModel.modifiedDate = new Date();
    try {
      let variants = await this.createOrUpdateVariants(
        androidCatalogueModel?.variants
      );
      androidCatalogueModel.variants = variants ? variants : undefined;

      let purchaseVarients = await this.createOrUpdatePurchaseVariants(
        androidCatalogueModel?.purchaseVariants
      );
      androidCatalogueModel.purchaseVariants = purchaseVarients
        ? purchaseVarients
        : undefined;

      let catalogueSeo = await this.createOrUpdateSeo(
        androidCatalogueModel?.seo
      );
      androidCatalogueModel.seo = catalogueSeo?._id;

      let storeCatalogueEntity = instanceToPlain(
        androidCatalogueModel
      ) as IAndroidCatalogueEntity;
      let catalogueResponse =
        this.androidCatalogueRepository.updateAndroidCatalogue(
          id,
          storeCatalogueEntity
        );
      return plainToInstance(
        CatalogueModel,
        catalogueResponse,
        TransformOptions.tranformOptions
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async deleteCatalogue(id: string): Promise<void> {
    let result: any;
    try {
      await this.androidCatalogueRepository.deleteAndroidCatalogue(id);
      result = {
        message: ErrorMessages.ANDROID_CATALOGUE_DELETED_SUCCESSFULLY,
      };
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  async filterCatalogue(
    filterType: string,
    filterCriteria: Object,
    pageSize: number,
    page: number
  ): Promise<CatalogueModel[]> {
    let filterResponse =
      await this.androidCatalogueRepository.filterAndroidCatalogues(
        filterCriteria,
        filterType,
        pageSize,
        page
      );

    let filterResponseToInstance = plainToInstance(
      CatalogueModel,
      filterResponse,
      TransformOptions.tranformOptions
    ) as any;
    return filterResponseToInstance;
  }
  async getCatalogueProduct(
    filterCriteria: Object,
    filterType: string | undefined
  ): Promise<CatalogueModel> {
    try {
      let androidCatalogues = plainToInstance(
        CatalogueModel,
        await this.androidCatalogueRepository.getAndroidCatalogue(
          filterCriteria
        ),
        TransformOptions.tranformOptions
      ) as any;
      return androidCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getProductCountBasedOnStores(
    filterCriteria: any
  ): Promise<CatalogueModel[]> {
    let result = plainToInstance(
      CatalogueModel,
      await this.androidCatalogueRepository.getProductCountBasedOnStores(
        filterCriteria
      ),
      TransformOptions.tranformOptions
    ) as any;

    return result;
  }
  async filterActiveCatalogueProducts(
    entityInternalId: string | undefined,
    filterCriteria: StoreCatalogueFilterModel,
    filterType: string,
    pageSize: number,
    page: number,
    extendedCatalogFlag: boolean
  ): Promise<StoreCatalogueDetailsModel[]> {
    let filterResponseToInstance;
    try {
      let { globalCatalogueProducts, breadCrumb }: any =
        await this.globalCatalogueHelperService.getGlobalCatalogueDetails(
          filterCriteria,
          extendedCatalogFlag,
          filterType
        );
      filterCriteria.entityInternalId = entityInternalId;
      let [storeProducts, categories, subCategories, classifications] =
        await this.androidCatalogueHelperService.getAndroidCatalogueDetails(
          filterCriteria,
          globalCatalogueProducts,
          pageSize,
          page,
          extendedCatalogFlag
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
      filterResponseToInstance = plainToInstance(
        AdvancedCatalogueFilterModel,
        storeCatalogueInfo,
        TransformOptions.tranformOptions
      );
    } catch (e) {
      console.log(e);
    }
    return filterResponseToInstance as any;
  }
  async updateCatalogueProducts(
    query: object,
    catalogueEntity: CatalogueModel
  ): Promise<CatalogueModel> {
    catalogueEntity.modifiedDate = new Date();
    let catalogueEntityEntity = instanceToPlain(
      catalogueEntity
    ) as IAndroidCatalogueEntity;
    try {
      let storeCatalogue =
        await this.androidCatalogueRepository.updateBulkAndroidCatalogue(
          query,
          catalogueEntityEntity
        );
      return storeCatalogue as any;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  createCatalogues(catalogues: CatalogueModel[]): Promise<CatalogueModel[]> {
    let catalogueEntity = instanceToPlain(
      catalogues
    ) as IAndroidCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.androidCatalogueRepository.createAndroidCatalogues(catalogueEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  updateCatalogues(
    catalogueModels: CatalogueModel[]
  ): Promise<CatalogueModel[]> {
    let categoryEntity = instanceToPlain(
      catalogueModels
    ) as IAndroidCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.androidCatalogueRepository.updateAndroidCatalogues(categoryEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  private async createOrUpdateVariants(variants: StoreCatalogueVariantModel[]) {
    if (!variants || variants.length <= 0) return;
    let catalogueariants = instanceToPlain(
      JSON.parse(JSON.stringify(variants)),
      {
        enableCircularCheck: true,
      }
    ) as IAndroidCatalogueVariantEntity[];
    let variantIds: any =
      catalogueariants.length > 0
        ? catalogueariants?.map((variant: any) => variant?._id)
        : [];
    let variantsResponse =
      await this.androidCatalogueVariantRepository.bulkWrite(catalogueariants);
    variantIds.push(...Object.values(variantsResponse.insertedIds));
    let filteredIds = variantIds?.filter((value: any) => value !== undefined);
    return objectIdArrayToStringArray(filteredIds);
  }

  private async createOrUpdatePurchaseVariants(
    variants: StoreCataloguePurchaseVariantModel[]
  ) {
    if (!variants || variants.length <= 0) return undefined;
    let catalogueariants = instanceToPlain(
      variants
    ) as IAndroidCataloguePurchaseVariantEntity[];
    let variantIds: any = catalogueariants?.map((variant: any) => variant?._id);
    let variantsResponse = await this.purchaseVariantRepository.bulkWrite(
      catalogueariants
    );
    variantIds.push(...Object.values(variantsResponse?.insertedIds));
    let filteredIds = variantIds?.filter((value: any) => value !== undefined);
    return objectIdArrayToStringArray(filteredIds);
  }

  private async createOrUpdateSeo(
    seoModel: SeoModel | undefined
  ): Promise<ISeoEntity | undefined> {
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
    return await this.seoRepository.createSeo(seoEntity);
  }

  async updateProductVariants(requestObject: {
    products: VariantRequestModel[];
  }): Promise<StoreCatalogueVariantModel[]> {
    try {
      let storeVariants = requestObject?.products?.length
        ? requestObject.products
        : [];
      const storeProducts =
        await this.androidCatalogueRepository.filterAndroidCatalogues(
          {
            entityInternalIds: storeVariants?.map(
              (item) => item.entityInternalId
            ),
            productIds: storeVariants?.map((e) => e.productId),
          },
          FilterConstants.WITH_VARIANTS
        );
      let variants = instanceToPlain(
        updateProductVariant(storeVariants, storeProducts),
        {
          enableCircularCheck: true,
        }
      ) as IAndroidCatalogueVariantEntity[];
      return await this.androidCatalogueVariantRepository.bulkWrite(variants);
    } catch (e) {
      throw e;
    }
  }

  async updateCatalogueVariants(
    androidCatalogueEntity: CatalogueModel[]
  ): Promise<any> {
    try {
      let variants: any = [];
      androidCatalogueEntity?.forEach((catalogue) => {
        let variant = catalogue.variants;
        variants = [...variants, ...variant];
      });
      let catalogueVariants = instanceToPlain(
        variants
      ) as IAndroidCatalogueVariantEntity[];

      return await this.androidCatalogueVariantRepository.bulkWrite(
        catalogueVariants
      );
    } catch (e) {
      throw e;
    }
  }
}

export default AndroidCatalogueService;
