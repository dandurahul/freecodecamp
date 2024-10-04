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
import { ICatalogueService } from "../../contracts/catalogues/i-catalogue.service";
import { CatalogueModel } from "../../../domain/models/catalogues/catalogue.model";
import { IWebCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-web-catalogue.repository";
import { IWebCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/web-catalogues.entity";
import { IWebCatalogueVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-web-variant.repository";
import { IWebCatalogueVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/web-catalogue-variants.entity";
import { IWebCataloguePurchaseVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-web-purchase-variant.repository";
import { IWebCatalogueHelperService } from "../../contracts/helper/i-web-catalogue.helper.service";
import { IWebCataloguePurchaseVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/web-purchase-variants.entity";
import { IStoreCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/store-catalogues.entity";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { updateProductVariant } from "../../builders/store-catalogue.builder";
import {
  validateArray,
  objectIdArrayToStringArray,
} from "../../utils/filter-functions";

@injectable()
class WebCatalogueService implements ICatalogueService {
  @inject(ContainerTypes.WebCatalogueRepository)
  private webCatalogueRepository!: IWebCatalogueRepository;
  @inject(ContainerTypes.WebCatalogueVariantRepository)
  private webCatalogueVariantRepository!: IWebCatalogueVariantRepository;
  @inject(ContainerTypes.WebCataloguePurchaseVariantRepository)
  private purchaseVariantRepository!: IWebCataloguePurchaseVariantRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.GlobalCatalogueHelpService)
  private globalCatalogueHelperService!: IGlobalCatalogueHelperService;
  @inject(ContainerTypes.WebCatalogueHelperService)
  private webCatalogueHelperService!: IWebCatalogueHelperService;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;

  async createCatalogue(
    webCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    let variants = await this.createOrUpdateVariants(
      webCatalogueModel?.variants
    );
    webCatalogueModel.variants = variants ? variants : undefined;
    let purchaseVarients = await this.createOrUpdatePurchaseVariants(
      webCatalogueModel?.purchaseVariants
    );
    webCatalogueModel.purchaseVariants = purchaseVarients
      ? purchaseVarients
      : undefined;
    let catalogueSeo = await this.createOrUpdateSeo(webCatalogueModel?.seo);
    webCatalogueModel.seo = catalogueSeo?._id;
    webCatalogueModel.modifiedDate = new Date();
    let webCatalogueEntity = instanceToPlain(webCatalogueModel, {
      enableCircularCheck: true,
    }) as IWebCatalogueEntity;
    let webCatalogueResponse =
      await this.webCatalogueRepository.createWebCatalogue(webCatalogueEntity);
    return plainToInstance(
      CatalogueModel,
      webCatalogueResponse,
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
    let webCatalogueProducts =
      await this.webCatalogueRepository.filterWebCatalogues({
        entityInternalId,
        productIds,
      });
    let CatalogueProducts: IWebCatalogueEntity[] =
      await this.buildWebCatalogueProductsData(
        productIds,
        webCatalogueProducts,
        storeCatalogueProducts,
        entityInternalId
      );
    let storeCatalogueResponse = await this.webCatalogueRepository.bulkInsert(
      CatalogueProducts
    );
    return plainToInstance(
      CatalogueModel,
      storeCatalogueResponse,
      TransformOptions.tranformOptions
    ) as unknown as CatalogueModel;
  }

  private async buildWebCatalogueProductsData(
    productIds: string[],
    webCatalogueProducts: IWebCatalogueEntity[],
    storeCatalogueProducts: IStoreCatalogueEntity[],
    entityInternalId: string
  ) {
    let catalogueProducts: IWebCatalogueEntity[] = [];
    //modify to productID
    for (const iterator of productIds) {
      let webCatalogue = webCatalogueProducts?.find((catalogue) => {
        return catalogue?.productId == iterator;
      });
      if (!webCatalogue) {
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
          let webCatalogue = {
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

          let webCatalogueEntity = instanceToPlain(webCatalogue, {
            enableCircularCheck: true,
          }) as IWebCatalogueEntity;
          catalogueProducts.push(webCatalogueEntity);
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
      let webCatalogues = plainToInstance(
        CatalogueModel,
        await this.webCatalogueRepository.filterWebCatalogues(
          {},
          filterType,
          pageSize,
          page
        ),
        TransformOptions.tranformOptions
      ) as any;
      return webCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //find by id
  async getCatalogueById(_id: string): Promise<CatalogueModel> {
    try {
      let webCatalogue = await this.webCatalogueRepository.getWebCatalogue({
        _id,
      });
      return plainToInstance(
        CatalogueModel,
        webCatalogue,
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
      let webCatalogues = plainToInstance(
        CatalogueModel,
        await this.webCatalogueRepository.getWebCatalogue(filterCriteria),
        TransformOptions.tranformOptions
      ) as any;
      return webCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateCatalogue(
    id: string,
    webCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    webCatalogueModel.modifiedDate = new Date();
    try {
      let variants = await this.createOrUpdateVariants(
        webCatalogueModel?.variants
      );
      webCatalogueModel.variants = variants ? variants : undefined;

      let purchaseVarients = await this.createOrUpdatePurchaseVariants(
        webCatalogueModel?.purchaseVariants
      );
      webCatalogueModel.purchaseVariants = purchaseVarients
        ? purchaseVarients
        : undefined;

      let catalogueSeo = await this.createOrUpdateSeo(webCatalogueModel?.seo);
      webCatalogueModel.seo = catalogueSeo?._id;

      let webCatalogueEntity = instanceToPlain(
        webCatalogueModel
      ) as IWebCatalogueEntity;
      let catalogueResponse = this.webCatalogueRepository.updateWebCatalogue(
        id,
        webCatalogueEntity
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
      await this.webCatalogueRepository.deleteWebCatalogue(id);
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
    let filterResponse = await this.webCatalogueRepository.filterWebCatalogues(
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
        await this.webCatalogueHelperService.getWebCatalogueDetails(
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

  createCatalogues(webCatalogues: CatalogueModel[]): Promise<CatalogueModel[]> {
    let catalogueEntity = instanceToPlain(
      webCatalogues
    ) as IWebCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.webCatalogueRepository.createWebCatalogues(catalogueEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  updateCatalogues(
    webCatalogueModels: CatalogueModel[]
  ): Promise<CatalogueModel[]> {
    let categoryEntity = instanceToPlain(
      webCatalogueModels
    ) as IWebCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.webCatalogueRepository.updateWebCatalogues(categoryEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  async filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel> {
    let count = await this.webCatalogueRepository.filterByPagination(
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
    ) as IWebCatalogueVariantEntity[];
    let variantIds: any = catalogueVariants?.map(
      (variant: any) => variant?._id
    );
    let variantsResponse = await this.webCatalogueVariantRepository.bulkWrite(
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
    ) as IWebCataloguePurchaseVariantEntity[];
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

  //TODO
  async updateCatalogueProducts(
    query: object,
    catalogueEntity: CatalogueModel
  ): Promise<CatalogueModel> {
    catalogueEntity.modifiedDate = new Date();
    let catalogueEntityEntity = instanceToPlain(
      catalogueEntity
    ) as IWebCatalogueEntity;
    try {
      let webCatalogue =
        await this.webCatalogueRepository.updateBulkWebCatalogue(
          query,
          catalogueEntityEntity
        );
      return webCatalogue as any;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateProductVariants(requestObject: {
    products: VariantRequestModel[];
  }): Promise<StoreCatalogueVariantModel[]> {
    try {
      let webVariants = requestObject?.products?.length
        ? requestObject.products
        : [];
      const storeProducts =
        await this.webCatalogueRepository.filterWebCatalogues(
          {
            entityInternalIds: webVariants?.map(
              (item) => item.entityInternalId
            ),
            productIds: webVariants?.map((e) => e.productId),
          },
          FilterConstants.WITH_VARIANTS
        );
      let variants = instanceToPlain(
        updateProductVariant(webVariants, storeProducts),
        {
          enableCircularCheck: true,
        }
      ) as IWebCatalogueVariantEntity[];
      return await this.webCatalogueVariantRepository.bulkWrite(variants);
    } catch (e) {
      throw e;
    }
  }

  async updateCatalogueVariants(
    webCatalogueEntity: CatalogueModel[]
  ): Promise<any> {
    try {
      let variants: any = [];
      webCatalogueEntity?.forEach((catalogue) => {
        let variant = catalogue.variants;
        variants = [...variants, ...variant];
      });
      let catalogueVariants = instanceToPlain(
        variants
      ) as IWebCatalogueVariantEntity[];
      return await this.webCatalogueVariantRepository.bulkWrite(
        catalogueVariants
      );
    } catch (e) {
      throw e;
    }
  }
}

export default WebCatalogueService;
