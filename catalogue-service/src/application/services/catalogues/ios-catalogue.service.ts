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
import { IStoreCatalogueVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/store-catalogue-variants.entity";
import { StoreCataloguePurchaseVariantModel } from "../../../domain/models/catalogues/store-catalogue-purchase-variants.model";
import { IGlobalCatalogueHelperService } from "../../contracts/helper/i-global-catalogue.helper.service";
import { StoreCatalogueFilterModel } from "../../../api/models/store-catalogue-product-filter.model";
import { AdvancedCatalogueFilterModel } from "../../../domain/models/catalogues/advanced-filter-reponse.model";
import FilterTypeEnum from "../../../infrastructure/enums/filter.enum";
import { FilterConstants } from "../../constants/filter.constants";
import { VariantRequestModel } from "../../../domain/models/catalogues/variant-update-request.model";
import { IIosCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-ios-catalogue.repository";
import { IIosCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/ios-catalogue.entity";
import { IIosCatalogueVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-ios-variant.repository";
import { IIosCataloguePurchaseVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-ios-purchase-variant.repository";
import { IIosCatalogueHelperService } from "../../contracts/helper/i-ios-catalogue.helper.service";
import { IIosCatalogueVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/ios-catalogue-variants.entity";
import { ICatalogueService } from "../../contracts/catalogues/i-catalogue.service";
import { CatalogueModel } from "../../../domain/models/catalogues/catalogue.model";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { IStoreCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/store-catalogues.entity";
import { IIosCataloguePurchaseVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/ios-purchase-variants.entity";
import { updateProductVariant } from "../../builders/store-catalogue.builder";
import {
  validateArray,
  objectIdArrayToStringArray,
} from "../../utils/filter-functions";

@injectable()
class IosCatalogueService implements ICatalogueService {
  @inject(ContainerTypes.IosCatalogueRepository)
  private iosCatelogueRepository!: IIosCatalogueRepository;
  @inject(ContainerTypes.IosCatalogueVariantRepository)
  private iosCatelogueVariantRepository!: IIosCatalogueVariantRepository;
  @inject(ContainerTypes.IosCataloguePurchaseVariantRepository)
  private purchaseVariantRepository!: IIosCataloguePurchaseVariantRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.GlobalCatalogueHelpService)
  private globalCatalogueHelperService!: IGlobalCatalogueHelperService;
  @inject(ContainerTypes.IosCatalogueHelperService)
  private iosCatalogueHelperService!: IIosCatalogueHelperService;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;

  async createCatalogue(
    iosCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    let variants = await this.createOrUpdateVariants(
      iosCatalogueModel?.variants
    );
    iosCatalogueModel.variants = variants ? variants : undefined;

    let purchaseVarients = await this.createOrUpdatePurchaseVariants(
      iosCatalogueModel?.purchaseVariants
    );

    iosCatalogueModel.purchaseVariants = purchaseVarients
      ? purchaseVarients
      : undefined;

    let catalogueSeo = await this.createOrUpdateSeo(iosCatalogueModel?.seo);
    iosCatalogueModel.seo = catalogueSeo?._id;

    iosCatalogueModel.modifiedDate = new Date();
    let iosCatalogueEntity = instanceToPlain(iosCatalogueModel, {
      enableCircularCheck: true,
    }) as IIosCatalogueEntity;

    let iosCatalogueResponse =
      await this.iosCatelogueRepository.createIosCatalogue(iosCatalogueEntity);
    return plainToInstance(
      CatalogueModel,
      iosCatalogueResponse,
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
          { entityInternalId: entityInternalId, productIds: productIds },
          FilterConstants.WITH_VARIANTS
        );

      storeCatalogueProducts = plainToInstance(
        StoreCatalogueDetailsModel,
        storeCatalogueProducts,
        TransformOptions.tranformOptions
      ) as any;
      let iosCatalogueProducts =
        await this.iosCatelogueRepository.filterIosCatalogues({
          entityInternalId,
          productIds,
        });
      let catalogueProducts: IIosCatalogueEntity[] =
        await this.buildIosCatalogueProductsData(
          productIds,
          iosCatalogueProducts,
          storeCatalogueProducts,
          entityInternalId
        );
      let iosCatalogueResponse = await this.iosCatelogueRepository.bulkInsert(
        catalogueProducts
      );
      return plainToInstance(
        CatalogueModel,
        iosCatalogueResponse,
        TransformOptions.tranformOptions
      ) as unknown as CatalogueModel;
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }

  private async buildIosCatalogueProductsData(
    productIds: string[],
    iosCatalogueProducts: IIosCatalogueEntity[],
    storeCatalogueProducts: IStoreCatalogueEntity[],
    entityInternalId: string
  ) {
    try {
      let catalogueProducts: IIosCatalogueEntity[] = [];
      //modify to productID
      for (const iterator of productIds) {
        let iosCatalogue = iosCatalogueProducts?.find((catalogue) => {
          return catalogue?.productId == iterator;
        });
        if (!iosCatalogue) {
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
            let iosCatalogue = {
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
            let iosCatalogueEntity = instanceToPlain(iosCatalogue, {
              enableCircularCheck: true,
            }) as IIosCatalogueEntity;
            catalogueProducts.push(iosCatalogueEntity);
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
      let iosCatalogues = plainToInstance(
        CatalogueModel,
        await this.iosCatelogueRepository.filterIosCatalogues(
          {},
          filterType,
          pageSize,
          page
        ),
        TransformOptions.tranformOptions
      ) as any;
      return iosCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //find by id
  async getCatalogueById(_id: string): Promise<CatalogueModel> {
    try {
      let iosCatalogue = await this.iosCatelogueRepository.getIosCatalogue({
        _id,
      });
      return plainToInstance(
        CatalogueModel,
        iosCatalogue,
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
      let iosCatalogues = plainToInstance(
        StoreCatalogueDetailsModel,
        await this.iosCatelogueRepository.getIosCatalogue(filterCriteria),
        TransformOptions.tranformOptions
      ) as any;
      return iosCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateCatalogue(
    id: string,
    iosCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    iosCatalogueModel.modifiedDate = new Date();
    try {
      let variants = await this.createOrUpdateVariants(
        iosCatalogueModel?.variants
      );
      iosCatalogueModel.variants = variants ? variants : undefined;
      let purchaseVarients = await this.createOrUpdatePurchaseVariants(
        iosCatalogueModel?.purchaseVariants
      );
      iosCatalogueModel.purchaseVariants = purchaseVarients
        ? purchaseVarients
        : undefined;
      let catalogueSeo = await this.createOrUpdateSeo(iosCatalogueModel?.seo);
      iosCatalogueModel.seo = catalogueSeo?._id;
      let iosCatalogueEntity = instanceToPlain(
        iosCatalogueModel
      ) as IIosCatalogueEntity;
      let catalogueResponse = this.iosCatelogueRepository.updateIosCatalogue(
        id,
        iosCatalogueEntity
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
      await this.iosCatelogueRepository.deleteIosCatalogue(id);
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
    let filterResponse = await this.iosCatelogueRepository.filterIosCatalogues(
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

  async getProductCountBasedOnStores(
    filterCriteria: any
  ): Promise<CatalogueModel[]> {
    let result = plainToInstance(
      CatalogueModel,
      await this.iosCatelogueRepository.getProductCountBasedOnStores(
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
        await this.iosCatalogueHelperService.getIosCatalogueDetails(
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
    let catalogueEntity = instanceToPlain(catalogues) as IIosCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.iosCatelogueRepository.createIosCatalogues(catalogueEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  updateCatalogues(
    catalogueModels: CatalogueModel[]
  ): Promise<CatalogueModel[]> {
    let categoryEntity = instanceToPlain(
      catalogueModels
    ) as IIosCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.iosCatelogueRepository.updateIosCatalogues(categoryEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  async filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel> {
    let count = await this.iosCatelogueRepository.filterByPagination(
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
    ) as IIosCatalogueVariantEntity[];
    let variantIds: any = catalogueVariants?.map(
      (variant: any) => variant?._id
    );
    let variantsResponse = await this.iosCatelogueVariantRepository.bulkWrite(
      catalogueVariants
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
    ) as IIosCataloguePurchaseVariantEntity[];
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
    ) as IIosCatalogueEntity;
    try {
      let storeCatalogue =
        await this.iosCatelogueRepository.updateBulkIosCatalogue(
          query,
          catalogueEntityEntity
        );
      return storeCatalogue as any;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateProductVariants(requestObject: {
    products: VariantRequestModel[];
  }): Promise<StoreCatalogueVariantModel[]> {
    try {
      let iosVariants = requestObject?.products?.length
        ? requestObject.products
        : [];
      const storeProducts =
        await this.iosCatelogueRepository.filterIosCatalogues(
          {
            entityInternalIds: iosVariants?.map(
              (item) => item.entityInternalId
            ),
            productIds: iosVariants?.map((e) => e.productId),
          },
          FilterConstants.WITH_VARIANTS
        );
      let variants = instanceToPlain(
        updateProductVariant(iosVariants, storeProducts),
        {
          enableCircularCheck: true,
        }
      ) as IIosCatalogueVariantEntity[];
      return await this.iosCatelogueVariantRepository.bulkWrite(variants);
    } catch (e) {
      throw e;
    }
  }

  async updateCatalogueVariants(
    iosCatalogueEntity: CatalogueModel[]
  ): Promise<any> {
    try {
      let variants: any = [];
      iosCatalogueEntity?.forEach((catalogue) => {
        let variant = catalogue.variants;
        variants = [...variants, ...variant];
      });
      let catalogueVariants = instanceToPlain(
        variants
      ) as IIosCatalogueVariantEntity[];
      return await this.iosCatelogueVariantRepository.bulkWrite(
        catalogueVariants
      );
    } catch (e) {
      throw e;
    }
  }
}

export default IosCatalogueService;
