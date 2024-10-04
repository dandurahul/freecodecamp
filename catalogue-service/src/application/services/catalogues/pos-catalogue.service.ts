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
import { IPosCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-pos-catalogue.reository";
import { IPosCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/pos-catalogue.entity";
import { IPosCatalogueHelperService } from "../../contracts/helper/i-pos-catalogue.helper.service";
import { IPosCatalogueVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/pos-catalogue-varint.entity";
import { IPosCatalogueVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-pos-variant.repository";
import { IPosCataloguePurchaseVariantRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-pos-purchase-variant.repository";
import { ICatalogueService } from "../../contracts/catalogues/i-catalogue.service";
import { CatalogueModel } from "../../../domain/models/catalogues/catalogue.model";
import { IStoreCatalogueRepository } from "../../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import { IStoreCatalogueEntity } from "../../../infrastructure/repositories/entities/catalogues/store-catalogues.entity";
import { IPosCataloguePurchaseVariantEntity } from "../../../infrastructure/repositories/entities/catalogues/pos-purchase-variants.entity";
import { updateProductVariant } from "../../builders/store-catalogue.builder";
import {
  validateArray,
  objectIdArrayToStringArray,
} from "../../utils/filter-functions";

@injectable()
class PosCatalogueService implements ICatalogueService {
  @inject(ContainerTypes.PosCatalogueRepository)
  private posCatelogueRepository!: IPosCatalogueRepository;
  @inject(ContainerTypes.PosCatalogueVariantRepository)
  private posCatelogueVariantRepository!: IPosCatalogueVariantRepository;
  @inject(ContainerTypes.PosCataloguePurchaseVariantRepository)
  private purchaseVariantRepository!: IPosCataloguePurchaseVariantRepository;
  @inject(ContainerTypes.SeoRepository)
  private seoRepository!: ISeoRepository;
  @inject(ContainerTypes.GlobalCatalogueHelpService)
  private globalCatalogueHelperService!: IGlobalCatalogueHelperService;
  @inject(ContainerTypes.PosCatalogueHelperService)
  private posCatalogueHelperService!: IPosCatalogueHelperService;
  @inject(ContainerTypes.StoreCatalogueRepository)
  private storeCatalogueRepository!: IStoreCatalogueRepository;

  async createCatalogue(
    posCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    let variants = await this.createOrUpdateVariants(
      posCatalogueModel?.variants
    );
    posCatalogueModel.variants = variants ? variants : undefined;

    let purchaseVarients = await this.createOrUpdatePurchaseVariants(
      posCatalogueModel?.purchaseVariants
    );

    posCatalogueModel.purchaseVariants = purchaseVarients
      ? purchaseVarients
      : undefined;

    let catalogueSeo = await this.createOrUpdateSeo(posCatalogueModel?.seo);
    posCatalogueModel.seo = catalogueSeo?._id;

    posCatalogueModel.modifiedDate = new Date();
    let posCatalogueEntity = instanceToPlain(posCatalogueModel, {
      enableCircularCheck: true,
    }) as IPosCatalogueEntity;

    let posCatalogueResponse =
      await this.posCatelogueRepository.createPosCatalogue(posCatalogueEntity);
    return plainToInstance(
      CatalogueModel,
      posCatalogueResponse,
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
      let posCatalogueProducts =
        await this.posCatelogueRepository.filterPosCatalogues({
          entityInternalId,
          productIds,
        });
      let catalogueProducts: IPosCatalogueEntity[] =
        await this.buildPosCatalogueProductsData(
          productIds,
          posCatalogueProducts,
          storeCatalogueProducts,
          entityInternalId
        );
      let posCatalogueResponse = await this.posCatelogueRepository.bulkInsert(
        catalogueProducts
      );
      return plainToInstance(
        CatalogueModel,
        posCatalogueResponse,
        TransformOptions.tranformOptions
      ) as unknown as CatalogueModel;
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }

  private async buildPosCatalogueProductsData(
    productIds: string[],
    posCatalogueProducts: IPosCatalogueEntity[],
    storeCatalogueProducts: IStoreCatalogueEntity[],
    entityInternalId: string
  ) {
    try {
      let catalogueProducts: IPosCatalogueEntity[] = [];
      //modify to productID
      for (const iterator of productIds) {
        let posCatalogue = posCatalogueProducts?.find((catalogue) => {
          return catalogue?.productId == iterator;
        });
        if (!posCatalogue) {
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
            let posCatalogue = {
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
            let posCatalogueEntity = instanceToPlain(posCatalogue, {
              enableCircularCheck: true,
            }) as IPosCatalogueEntity;
            catalogueProducts.push(posCatalogueEntity);
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
      let posCatalogues = plainToInstance(
        CatalogueModel,
        await this.posCatelogueRepository.filterPosCatalogues(
          {},
          filterType,
          pageSize,
          page
        ),
        TransformOptions.tranformOptions
      ) as any;
      return posCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //find by id
  async getCatalogueById(_id: string): Promise<CatalogueModel> {
    try {
      let posCatalogue = await this.posCatelogueRepository.getPosCatalogue({
        _id,
      });
      return plainToInstance(
        CatalogueModel,
        posCatalogue,
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
      let storeCatalogues = plainToInstance(
        CatalogueModel,
        await this.posCatelogueRepository.getPosCatalogue(filterCriteria),
        TransformOptions.tranformOptions
      ) as any;
      return storeCatalogues;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateCatalogue(
    id: string,
    posCatalogueModel: CatalogueModel
  ): Promise<CatalogueModel> {
    posCatalogueModel.modifiedDate = new Date();
    try {
      let variants = await this.createOrUpdateVariants(
        posCatalogueModel?.variants
      );
      posCatalogueModel.variants = variants ? variants : undefined;
      let purchaseVarients = await this.createOrUpdatePurchaseVariants(
        posCatalogueModel?.purchaseVariants
      );
      posCatalogueModel.purchaseVariants = purchaseVarients
        ? purchaseVarients
        : undefined;
      let catalogueSeo = await this.createOrUpdateSeo(posCatalogueModel?.seo);
      posCatalogueModel.seo = catalogueSeo?._id;
      let posCatalogueEntity = instanceToPlain(
        posCatalogueModel
      ) as IPosCatalogueEntity;
      let catalogueResponse = this.posCatelogueRepository.updatePosCatalogue(
        id,
        posCatalogueEntity
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
      await this.posCatelogueRepository.deletePosCatalogue(id);
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
    let filterResponse = await this.posCatelogueRepository.filterPosCatalogues(
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
        await this.posCatalogueHelperService.getPosCatalogueDetails(
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
    let catalogueEntity = instanceToPlain(catalogues) as IPosCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.posCatelogueRepository.createPosCatalogues(catalogueEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  updateCatalogues(
    catalogueModels: CatalogueModel[]
  ): Promise<CatalogueModel[]> {
    let categoryEntity = instanceToPlain(
      catalogueModels
    ) as IPosCatalogueEntity[];

    return plainToInstance(
      CatalogueModel,
      this.posCatelogueRepository.updatePosCatalogues(categoryEntity),
      TransformOptions.tranformOptions
    ) as any;
  }

  async filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<PaginationModel> {
    let count = await this.posCatelogueRepository.filterByPagination(
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
    ) as IPosCatalogueVariantEntity[];
    let variantIds: any = catalogueVariants?.map(
      (variant: any) => variant?._id
    );
    let variantsResponse = await this.posCatelogueVariantRepository.bulkWrite(
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
    ) as IPosCataloguePurchaseVariantEntity[];
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
    ) as IPosCatalogueEntity;
    try {
      let storeCatalogue =
        await this.posCatelogueRepository.updateBulkPosCatalogue(
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
      let storeVariants = requestObject?.products?.length
        ? requestObject.products
        : [];
      const storeProducts =
        await this.posCatelogueRepository.filterPosCatalogues(
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
      ) as IPosCatalogueVariantEntity[];
      return await this.posCatelogueVariantRepository.bulkWrite(variants);
    } catch (e) {
      throw e;
    }
  }

  async updateCatalogueVariants(
    posCatalogueEntity: CatalogueModel[]
  ): Promise<any> {
    try {
      let variants: any = [];
      posCatalogueEntity?.forEach((catalogue) => {
        let variant = catalogue.variants;
        variants = [...variants, ...variant];
      });
      let catalogueVariants = instanceToPlain(
        variants
      ) as IPosCatalogueVariantEntity[];
      return await this.posCatelogueVariantRepository.bulkWrite(
        catalogueVariants
      );
    } catch (e) {
      throw e;
    }
  }
}

export default PosCatalogueService;
