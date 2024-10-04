import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { injectable, inject } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
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
import { CatalogueModel } from "../../../domain/models/catalogues/catalogue.model";
import { IMobileCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-mobile-catalogue.repository";
import { IMobileCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/mobile-catalogues.entity";
import { IMobileCatalogueVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-mobile-variant.repository";
import { IMobileCataloguePurchaseVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-mobile-purchase-variant.repository";
import { IMobileCatalogueVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/mobile.catalogue-variants.entity";
import { IMobileCataloguePurchaseVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/mobile-purchase-variants.entity";
import { IMobileCatalogueHelperService } from "../../contracts/helper/i-mobile-catalogue.helper.service";
import { ICatalogueService } from "../../contracts/catalogues/i-catalogue.service";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { IStoreCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/store-catalogues.entity";
import { updateProductVariant } from "../../builders/store-catalogue.builder";
import {
  validateArray,
  objectIdArrayToStringArray,
} from "../../utils/filter-functions";

@injectable()
class MobileCatalogueService implements ICatalogueService {
  @inject(ContainerTypes.MobileCatalogueRepository)
  private mobileCatalogueRepository!: IMobileCatalogueRepository;
  @inject(ContainerTypes.MobileCatalogueVariantRepository)
  private mobileCatelogueVariantRepository!: IMobileCatalogueVariantRepository;
  @inject(ContainerTypes.MobileCataloguePurchaseVariantRepository)
  private purchaseVariantRepository!: IMobileCataloguePurchaseVariantRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.GlobalCatalogueHelpService)
  private globalCatalogueHelperService!: IGlobalCatalogueHelperService;
  @inject(ContainerTypes.MobileCatalogueHelperService)
  private mobileCatalogueHelperService!: IMobileCatalogueHelperService;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;

  async createCatalogue(
    mobileCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    let variants = await this.createOrUpdateVariants(
      mobileCatalogueModel?.variants
    );
    mobileCatalogueModel.variants = variants ? variants : undefined;
    let purchaseVarients = await this.createOrUpdatePurchaseVariants(
      mobileCatalogueModel?.purchaseVariants
    );
    mobileCatalogueModel.purchaseVariants = purchaseVarients
      ? purchaseVarients
      : undefined;
    let catalogueSeo = await this.createOrUpdateSeo(mobileCatalogueModel?.seo);
    mobileCatalogueModel.seo = catalogueSeo?._id;
    mobileCatalogueModel.modifiedDate = new Date();
    let mobileCatalogueEntity = instanceToPlain(mobileCatalogueModel, {
      enableCircularCheck: true,
    }) as IMobileCatalogueEntity;
    let mobileCatalogueResponse =
      await this.mobileCatalogueRepository.createMobileCatalogue(
        mobileCatalogueEntity
      );
    return plainToInstance(
      CatalogueModel,
      mobileCatalogueResponse,
      TransformOptions.tranformOptions
    );
  }

  async createCatalogueProducts(
    entityInternalId: string,
    productIds: string[]
  ): Promise<CatalogueModel> {
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
    let mobileCatalogueProducts =
      await this.mobileCatalogueRepository.filterMobileCatalogues({
        entityInternalId,
        productIds,
      });
    let catalogueProducts: IMobileCatalogueEntity[] =
      await this.buildMobileCatalogueProductsData(
        productIds,
        mobileCatalogueProducts,
        storeCatalogueProducts,
        entityInternalId
      );
    let mobileCatalogueResponse =
      await this.mobileCatalogueRepository.bulkInsert(catalogueProducts);
    return plainToInstance(
      CatalogueModel,
      mobileCatalogueResponse,
      TransformOptions.tranformOptions
    ) as unknown as CatalogueModel;
  }

  private async buildMobileCatalogueProductsData(
    productIds: string[],
    mobileCatalogueProducts: IMobileCatalogueEntity[],
    storeCatalogueProducts: IStoreCatalogueEntity[],
    entityInternalId: string
  ) {
    let catalogueProducts: IMobileCatalogueEntity[] = [];
    //modify to productID
    for (const iterator of productIds) {
      let mobileCatalogue = mobileCatalogueProducts?.find((catalogue) => {
        return catalogue?.productId == iterator;
      });
      if (!mobileCatalogue) {
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
          let mobileCatalogue = {
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
          let mobileCatalogueEntity = instanceToPlain(mobileCatalogue, {
            enableCircularCheck: true,
          }) as IMobileCatalogueEntity;
          catalogueProducts.push(mobileCatalogueEntity);
        }
      }
    }
    return catalogueProducts;
  }

  async getCatalogues(
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<CatalogueModel[]> {
    try {
      let mobileCatalogues = plainToInstance(
        CatalogueModel,
        await this.mobileCatalogueRepository.filterMobileCatalogues(
          {},
          filterType,
          pageSize,
          page
        ),
        TransformOptions.tranformOptions
      ) as any;
      return mobileCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //find by id
  async getCatalogueById(_id: string): Promise<CatalogueModel> {
    try {
      let mobileCatalogue =
        await this.mobileCatalogueRepository.getMobileCatalogue({
          _id,
        });
      return plainToInstance(
        CatalogueModel,
        mobileCatalogue,
        TransformOptions.tranformOptions
      );
    } catch (e) {
      throw e;
    }
  }

  async getCatalogueProduct(
    filterCriteria: Object,
    filterType: string | undefined
  ): Promise<CatalogueModel> {
    try {
      let mobileCatalogues = plainToInstance(
        CatalogueModel,
        await this.mobileCatalogueRepository.getMobileCatalogue(filterCriteria),
        TransformOptions.tranformOptions
      ) as any;
      return mobileCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateCatalogue(
    id: string,
    mobileCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    mobileCatalogueModel.modifiedDate = new Date();
    try {
      let variants = await this.createOrUpdateVariants(
        mobileCatalogueModel?.variants
      );
      mobileCatalogueModel.variants = variants ? variants : undefined;

      let purchaseVarients = await this.createOrUpdatePurchaseVariants(
        mobileCatalogueModel?.purchaseVariants
      );
      mobileCatalogueModel.purchaseVariants = purchaseVarients
        ? purchaseVarients
        : undefined;

      let catalogueSeo = await this.createOrUpdateSeo(
        mobileCatalogueModel?.seo
      );
      mobileCatalogueModel.seo = catalogueSeo?._id;

      let mobileCatalogueEntity = instanceToPlain(
        mobileCatalogueModel
      ) as IMobileCatalogueEntity;
      let catalogueResponse =
        this.mobileCatalogueRepository.updateMobileCatalogue(
          id,
          mobileCatalogueEntity
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
      await this.mobileCatalogueRepository.deleteMobileCatalogue(id);
      result = {
        message: ErrorMessages.GLOBAL_CATALOGUE_DELETED_SUCCESSFULLY,
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
      await this.mobileCatalogueRepository.filterMobileCatalogues(
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
  //TODO
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
        await this.mobileCatalogueHelperService.getMobileCatalogueDetails(
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

  createCatalogues(catalogues: CatalogueModel[]): Promise<CatalogueModel[]> {
    let catalogueEntity = instanceToPlain(
      catalogues
    ) as IMobileCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.mobileCatalogueRepository.createMobileCatalogues(catalogueEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  updateCatalogues(
    catalogueModels: CatalogueModel[]
  ): Promise<CatalogueModel[]> {
    let categoryEntity = instanceToPlain(
      catalogueModels
    ) as IMobileCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.mobileCatalogueRepository.updateMobileCatalogues(categoryEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  async filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel> {
    let count = await this.mobileCatalogueRepository.filterByPagination(
      filterCriteria
    );
    return buildPaginationObject(count, pageSize);
  }

  private async createOrUpdateVariants(variants: StoreCatalogueVariantModel[]) {
    if (!variants || variants.length <= 0) return;
    let catalogueVariants = instanceToPlain(
      JSON.parse(JSON.stringify(variants)),
      {
        enableCircularCheck: true,
      }
    ) as IMobileCatalogueVariantEntity[];
    let variantIds: any = catalogueVariants?.map(
      (variant: any) => variant?._id
    );
    let variantsResponse =
      await this.mobileCatelogueVariantRepository.bulkWrite(catalogueVariants);
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
    ) as IMobileCataloguePurchaseVariantEntity[];
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

  async updateCatalogueProducts(
    query: object,
    catalogueEntity: CatalogueModel
  ): Promise<CatalogueModel> {
    catalogueEntity.modifiedDate = new Date();
    let catalogueEntityEntity = instanceToPlain(
      catalogueEntity
    ) as IMobileCatalogueEntity;
    try {
      let mobileCatalogue =
        await this.mobileCatalogueRepository.updateBulkMobileCatalogue(
          query,
          catalogueEntityEntity
        );
      return mobileCatalogue as any;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateProductVariants(requestObject: {
    products: VariantRequestModel[];
  }): Promise<StoreCatalogueVariantModel[]> {
    try {
      let storeVariants = requestObject?.products?.length
        ? requestObject.products
        : [];
      const storeProducts =
        await this.mobileCatalogueRepository.filterMobileCatalogues(
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
      ) as IMobileCatalogueVariantEntity[];
      return await this.mobileCatelogueVariantRepository.bulkWrite(variants);
    } catch (e) {
      throw e;
    }
  }

  async updateCatalogueVariants(
    mobileCatalogueEntity: CatalogueModel[]
  ): Promise<any> {
    try {
      let variants: any = [];
      mobileCatalogueEntity?.forEach((catalogue) => {
        let variant = catalogue.variants;
        variants = [...variants, ...variant];
      });
      let catalogueVariants = instanceToPlain(
        variants
      ) as IMobileCatalogueVariantEntity[];

      return await this.mobileCatelogueVariantRepository.bulkWrite(
        catalogueVariants
      );
    } catch (e) {
      throw e;
    }
  }
}

export default MobileCatalogueService;
