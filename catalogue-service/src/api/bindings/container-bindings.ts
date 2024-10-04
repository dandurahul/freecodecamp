import { Container } from "inversify";
import { ContainerTypes } from "./container-types";
import { IRepositoryBase } from "../../infrastructure/repositories/contracts/base/i-repository-base";
import { ICategoryEntity } from "../../infrastructure/repositories/entities/categories/category.entity";
import { CategoryRepositoryBase } from "../../infrastructure/repositories/impl/categories/category.repository.base";
import { ICategoryRepository } from "../../infrastructure/repositories/contracts/catagories/i-category.repository";
import CategoryRepository from "../../infrastructure/repositories/impl/categories/category.repository";
import { ISubCategoryEntity } from "../../infrastructure/repositories/entities/categories/sub-category.entity";
import { SubCategoryRepositoryBase } from "../../infrastructure/repositories/impl/categories/sub-category.repository.base";
import { IClassificationEntity } from "../../infrastructure/repositories/entities/categories/classification.entity";
import SubCategoryRepository from "../../infrastructure/repositories/impl/categories/sub-category.repository";
import { ClassificationRepositoryBase } from "../../infrastructure/repositories/impl/categories/classification.repository.base";
import { ISubCategoryRepository } from "../../infrastructure/repositories/contracts/catagories/i-sub-category.repository";
import { ICategoryService } from "../../application/contracts/categories/i-category.service";
import CategoryService from "../../application/services/categories/category.service";
import { ISubCategoryService } from "../../application/contracts/categories/i-sub-category.service";
import SubCategoryService from "../../application/services/categories/sub-category.service";
import { IClassificationService } from "../../application/contracts/categories/i-classification.service";
import ClassificationService from "../../application/services/categories/classification.service";
import { ICategoryController } from "../contracts/i-catategory.controller";
import CategoryController from "../controllers/categories/category.controller";
import { IClassificationRepository } from "../../infrastructure/repositories/contracts/catagories/i-classification.repository";
import ClassificationRepository from "../../infrastructure/repositories/impl/categories/classification.repository";
import { ISubCategoryController } from "../contracts/i-sub-category.controller";
import SubCategoryController from "../controllers/categories/sub-category.controller";
import { IClassificationController } from "../contracts/i-classification.controller";
import ClassificationController from "../controllers/categories/classification.controller";
import { IMediaTypeEntity } from "../../infrastructure/repositories/entities/imedia-type.entity";
import { MediaTypeRepositoryBase } from "../../infrastructure/repositories/impl/media-type.repository.base";
import { IMediaTypeRepository } from "../../infrastructure/repositories/contracts/i-media-type.repository";
import MediaTypeRepository from "../../infrastructure/repositories/impl/media-type.repository";
import { ISeoEntity } from "../../infrastructure/repositories/entities/iseo.entity";
import { SeoRepositoryBase } from "../../infrastructure/repositories/impl/seo.repository.base";
import { ISeoRepository } from "../../infrastructure/repositories/contracts/i-seo.repository";
import SeoRepository from "../../infrastructure/repositories/impl/seo.repository";
import { IGlobalCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-global-catalogue.repository";
import { GlobalCatalogueRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/global-catalogue.repository.base";
import { IGlobalCatalogueEntity } from "../../infrastructure/repositories/entities/catalogues/global-catalogues.entity";
import GlobalCatalogueRepository from "../../infrastructure/repositories/impl/catalogues/global-catalogue.repository";
import { IGlobalCatalogueVariantEntity } from "../../infrastructure/repositories/entities/catalogues/global-catalogue-variants.entity";
import { GlobalCatalogueVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/global-catalogue-variant.repository.base";
import { IGlobalCatalogueVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-global-catalogue-variant.repository";
import GlobalCatalogueVariantRepository from "../../infrastructure/repositories/impl/catalogues/global-catalogue-variant.repository";
import GlobalCataloguePurchaseVariantRepository from "../../infrastructure/repositories/impl/catalogues/global-catalogue-purchase-variant.repository";
import { IGlobalCataloguePurchaseVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-global-purchase-variant.repository";
import { GlobalCataloguePurchaseVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/global-catalogue-purchase-variant.repository.base";
import { IGlobalCataloguePurchaseVariantEntity } from "../../infrastructure/repositories/entities/catalogues/global-purchase-variants.entity";
import StoreCatalogue, {
  IStoreCatalogueEntity,
} from "../../infrastructure/repositories/entities/catalogues/store-catalogues.entity";
import { StoreCatalogueRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/store-catalogue.repository.base";
import { IStoreCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-store-catalogue.repository";
import StoreCatalogueRepository from "../../infrastructure/repositories/impl/catalogues/store-catalogue.repository";
import { IStoreCatalogueVariantEntity } from "../../infrastructure/repositories/entities/catalogues/store-catalogue-variants.entity";
import { StoreCatalogueVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/store-catalogue-variant.repository.base";
import { IStoreCatalogueVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-store-catalogue-variant.repository";
import StoreCatalogueVariantRepository from "../../infrastructure/repositories/impl/catalogues/store-catalogue-variant.repository";
import { IStoreCataloguePurchaseVariantEntity } from "../../infrastructure/repositories/entities/catalogues/store-purchase-variants.entity";
import { StoreCataloguePurchaseVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/store-catalogue-purchase-variant.repository.base";
import { IStoreCataloguePurchaseVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-store-purchase-variant.repository";
import StoreCataloguePurchaseVariantRepository from "../../infrastructure/repositories/impl/catalogues/store-catalogue-purchase-variant.repository";
import { IGlobalCatalogueService } from "../../application/contracts/catalogues/i-global-catalogue.service";
import GlobalCatalogueService from "../../application/services/catalogues/global-catalogue.service";
import { IStoreCatalogueService } from "../../application/contracts/catalogues/i-store-catalogue.service";

import StoreCatalogueService from "../../application/services/catalogues/store-catalogue.service";

import { IGlobalCatalogueController } from "../contracts/i-global-catalogues.controller";
import GlobalCatalogueController from "../controllers/catalogues/global-catalogues.controller";
import { IStoreCatalogueController } from "../contracts/i-store-catalogues.controller";

import StoreCatalogueController from "../controllers/catalogues/store-catalogues.controller";

import { IProductExemptionEntity } from "../../infrastructure/repositories/entities/exemptions/product-exemptions.entity";
import { IProductHighlightEntity } from "../../infrastructure/repositories/entities/categories/product-highlight.entity";
import { ProductHighlightRepositoryBase } from "../../infrastructure/repositories/impl/categories/product-highlight.repository.base";
import { IProductHighlightRepository } from "../../infrastructure/repositories/contracts/catagories/i-product-highlight.repository";
import ProductHighlightRepository from "../../infrastructure/repositories/impl/categories/product-highlight.repository";
import { IHighlightService } from "../../application/contracts/categories/i-product-highlight.service";
import HighlightService from "../../application/services/categories/highlights.service";
import { IHighlightController } from "../contracts/i-highlight.controller";
import { HighlightController } from "../controllers/categories/highlight.controller";
import { IStoreCatalogueFilterService } from "../../application/contracts/catalogues/i-store-catalogue-filter.service";
import StoreCalalogueFilterService from "../../application/services/catalogues/store-catalogue-filter.service";
import { IReservedQuantityEntity } from "../../infrastructure/repositories/entities/reserved/reserved-quantity.entity";
import { ReservedQuantityRepositoryBase } from "../../infrastructure/repositories/impl/reserved/reserved-quantity.repository.base";
import { IReservedQuantityRepository } from "../../infrastructure/repositories/contracts/reserved/i-reserved-quantity.repository";
import ReservedQuantityRepository from "../../infrastructure/repositories/impl/reserved/reserved-quantity.repository";
import { IReservedQuantityService } from "../../application/contracts/reserved/i-reserved-quantity.service";
import ReservedQuantityService from "../../application/services/reserved/reserved-quantity.service";
import { IReservedQuantityController } from "../contracts/i-reserved-quantity.controller";
import ReservedQuantityController from "../controllers/reserved-quantity/reserved-quantity.controller";
import { ProductExemptionRepositoryBase } from "../../infrastructure/repositories/impl/exemptions/product-exemption.repository.base";
import ProductExemptionRepository from "../../infrastructure/repositories/impl/exemptions/product-exemption.repository";
import { IProductExemptionRepository } from "../../infrastructure/repositories/contracts/exemptions/i-product-exemption.repository";
import { IProductExemptionsService } from "../../application/contracts/product-exemptions/i-product-exemptions.service";
import ProductExemptionsService from "../../application/services/product-exemptions/product-exemptions.service";
import ProductExemptionController from "../controllers/product-exemptions/product-exemptions.controller";
import { IProductExemptionController } from "../contracts/i-product-exemptions.controller";
import { ICrossSellingProductsEntity } from "../../infrastructure/repositories/entities/cross-selling/cross-selling-products.entity";
import { CrossSellingProductsRepositoryBase } from "../../infrastructure/repositories/impl/cross-selling/cross-selling-products.repository.base";
import { ICrossSellingProductsRepository } from "../../infrastructure/repositories/contracts/cross-selling/i-cross-selling-products.repository";
import CrossSellingProductsRepository from "../../infrastructure/repositories/impl/cross-selling/cross-selling-products.repository";
import { ICrossSellingProductService } from "../../application/contracts/cross-selling/i-cross-selling-products.service";
import CrossSellingProductsService from "../../application/services/cross-selling/cross-selling-products.service";
import { ICrossSellingProductController } from "../contracts/i-cross-selling-products.controller";
import CrossSellingProductsController from "../controllers/cross-selling/cross-selling-products.controller";
import { IGlobalCatalogueHelperService } from "../../application/contracts/helper/i-global-catalogue.helper.service";
import GlobalCatalogueHelperService from "../../application/helpers/global-catalogue.helper";
import { IStoreCatalogueHelperService } from "../../application/contracts/helper/i-store-catalogue.helper.service";
import StoreCatalogueHelperService from "../../application/helpers/store-catalogue.helper";
import HighlightHelperService from "../../application/helpers/highlight.helper";
import { IHighlightHelperService } from "../../application/contracts/helper/i-highlight.helper.service";
import { WebCatalogueRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/web-catalogue.repository.base";
import { IWebCatalogueEntity } from "../../infrastructure/repositories/entities/catalogues/web-catalogues.entity";
import WebCatalogueRepository from "../../infrastructure/repositories/impl/catalogues/web-catalogue.repository";
import { IWebCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-web-catalogue.repository";
import WebCatalogueService from "../../application/services/catalogues/web-catalogue.service";
import { ICatalogueService } from "../../application/contracts/catalogues/i-catalogue.service";
import WebCatalogueController from "../controllers/catalogues/web-catalogues.controller";
import { ICatalogueController } from "../contracts/i-catalogue-controller";
import { IMobileCatalogueEntity } from "../../infrastructure/repositories/entities/catalogues/mobile-catalogues.entity";
import { MobileCatalogueRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/mobile-catalogue.repository.base";
import MobileCatalogueRepository from "../../infrastructure/repositories/impl/catalogues/mobile-catalogue.repository";
import { IMobileCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-mobile-catalogue.repository";
import MobileCatalogueService from "../../application/services/catalogues/mobile-catalogue.service";

import MobileCatalogueController from "../controllers/catalogues/mobile-catalogues.controller";
import { WebCataloguePurchaseVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/web-catalogue-purchase-variant.repository.base";
import { IWebCataloguePurchaseVariantEntity } from "../../infrastructure/repositories/entities/catalogues/web-purchase-variants.entity";
import { WebCatalogueVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/web-catalogue-variant.repository.base";
import { IWebCatalogueVariantEntity } from "../../infrastructure/repositories/entities/catalogues/web-catalogue-variants.entity";
import WebCataloguePurchaseVariantRepository from "../../infrastructure/repositories/impl/catalogues/web-catalogue-purchase-variant.repository";
import { IWebCataloguePurchaseVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-web-purchase-variant.repository";
import WebCatalogueVariantRepository from "../../infrastructure/repositories/impl/catalogues/web-catalogue-variant.repository";
import { IWebCatalogueVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-web-variant.repository";
import { IMobileCataloguePurchaseVariantEntity } from "../../infrastructure/repositories/entities/catalogues/mobile-purchase-variants.entity";
import { MobileCataloguePurchaseVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/mobile-catalogue-purchase-variant.repository.base";
import { IMobileCataloguePurchaseVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-mobile-purchase-variant.repository";
import MobileCataloguePurchaseVariantRepository from "../../infrastructure/repositories/impl/catalogues/mobile-catalogue-purchase-variant.repository";
import WebCatalogueHelperService from "../../application/helpers/web-catalogue.helper";
import { IWebCatalogueHelperService } from "../../application/contracts/helper/i-web-catalogue.helper.service";
import WebCalalogueFilterService from "../../application/services/catalogues/web-catalogue-filter.service";

import MobileCatalogueFilterService from "../../application/services/catalogues/mobile-catalogue-filter.service";
import MobileCatalogueVariantRepository from "../../infrastructure/repositories/impl/catalogues/mobile-catalogue-variant.repository";
import { IMobileCatalogueVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-mobile-variant.repository";
import { IPosCatalogueEntity } from "../../infrastructure/repositories/entities/catalogues/pos-catalogue.entity";
import { PosCatalogueRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/pos-catalogue.repository.base";
import { IPosCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-pos-catalogue.reository";
import PosCatalogueRepository from "../../infrastructure/repositories/impl/catalogues/pos-catalogue.repository";
import PosCatalogueService from "../../application/services/catalogues/pos-catalogue.service";
import PosCatalogueController from "../controllers/catalogues/pos-catalogue.controller";
import { IPosCatalogueHelperService } from "../../application/contracts/helper/i-pos-catalogue.helper.service";
import PosCatalogueHelperService from "../../application/helpers/pos-catalogue.helper";

import { IPosCataloguePurchaseVariantEntity } from "../../infrastructure/repositories/entities/catalogues/pos-purchase-variants.entity";
import { PosCataloguePurchaseVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/pos-catalogue-purchase-variant.repository.base";
import { IPosCataloguePurchaseVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-pos-purchase-variant.repository";
import PosCataloguePurchaseVariantRepository from "../../infrastructure/repositories/impl/catalogues/pos-catalogue-purchase-variant.repository";
import { IPosCatalogueVariantEntity } from "../../infrastructure/repositories/entities/catalogues/pos-catalogue-varint.entity";
import { PosCatalogueVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/pos-catalogue-variant.repository.base";
import { IPosCatalogueVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-pos-variant.repository";
import PosCatalogueVariantRepository from "../../infrastructure/repositories/impl/catalogues/pos-catalogue-variant.repository";
import PosCatalogueFilterService from "../../application/services/catalogues/pos-catalogue-filter.service";
import { IIosCatalogueEntity } from "../../infrastructure/repositories/entities/catalogues/ios-catalogue.entity";
import { IosCatalogueRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/ios-catalogue.repository.base";
import { IIosCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-ios-catalogue.repository";
import IosCatalogueRepository from "../../infrastructure/repositories/impl/catalogues/ios-catalogue.repository";

import IosCatalogueService from "../../application/services/catalogues/ios-catalogue.service";
import IosCatalogueController from "../controllers/catalogues/ios-catalogue.controller";
import { IIosCatalogueHelperService } from "../../application/contracts/helper/i-ios-catalogue.helper.service";
import IosCatalogueHelperService from "../../application/helpers/ios-catalogue.helper";

import IosCatalogueFilterService from "../../application/services/catalogues/ios-catalogue-filter.service";
import { IIosCataloguePurchaseVariantEntity } from "../../infrastructure/repositories/entities/catalogues/ios-purchase-variants.entity";
import { IosCataloguePurchaseVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/ios-catalogue-purchase-variant.repository.base";
import { IIosCataloguePurchaseVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-ios-purchase-variant.repository";
import IosCataloguePurchaseVariantRepository from "../../infrastructure/repositories/impl/catalogues/ios-catalogue-purchse-variant.repository";
import { IIosCatalogueVariantEntity } from "../../infrastructure/repositories/entities/catalogues/ios-catalogue-variants.entity";
import { IosCatalogueVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/ios-catalogue-variant.repoisitory.base";
import { IIosCatalogueVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-ios-variant.repository";
import IosCatalogueVariantRepository from "../../infrastructure/repositories/impl/catalogues/ios-catalogue-variant.repository";
import { IAndroidCatalogueEntity } from "../../infrastructure/repositories/entities/catalogues/android-catalogue.entity";
import { AndroidCatalogueRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/android-catalogue.repository.base";
import { IAndroidCatalogueRepository } from "../../infrastructure/repositories/contracts/catalogues/i-android-catalogue.repository";
import AndroidCatalogueRepository from "../../infrastructure/repositories/impl/catalogues/android-catalogue.repository";

import AndroidCatalogueService from "../../application/services/catalogues/android-catalogue.service";
import AndroidCatalogueController from "../controllers/catalogues/android-catalogues.controller";
import { IAndroidCatalogueHelperService } from "../../application/contracts/helper/i-android-catalogue.helper.service";
import AndroidCatalogueHelperService from "../../application/helpers/android-catalogue.helper";

import AndroidCatalogueFilterService from "../../application/services/catalogues/android-catalogue-filter.service";
import { IAndroidCataloguePurchaseVariantEntity } from "../../infrastructure/repositories/entities/catalogues/android-catalogue-purchase-variant.entity";
import { AndroidCataloguePurchaseVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/android-catalogue-purchase-variant.repository.base";
import { IAndroidCataloguePurchaseVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-android-purchase-variant.repository";
import AndroidCataloguePurchaseVariantRepository from "../../infrastructure/repositories/impl/catalogues/android-catalogue-purchase-variant.repository";
import { IAndroidCatalogueVariantEntity } from "../../infrastructure/repositories/entities/catalogues/android-catalogue-variant.entity";
import { AndroidCatalogueVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/android-catalogue-variant.repository.base";
import { IAndroidCatalogueVariantRepository } from "../../infrastructure/repositories/contracts/catalogues/i-android-variant.repository";
import AndroidCatalogueVariantRepository from "../../infrastructure/repositories/impl/catalogues/android-catalogue-variant.repository";
import MobileCatalogueHelperService from "../../application/helpers/mobile-catalogue.helper";
import { IMobileCatalogueHelperService } from "../../application/contracts/helper/i-mobile-catalogue.helper.service";
import { MobileCatalogueVariantRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/mobile-catalogue-variant.repository.base";
import { IMobileCatalogueVariantEntity } from "../../infrastructure/repositories/entities/catalogues/mobile.catalogue-variants.entity";

import { IExtendedGlobalCatalogService } from "../../application/contracts/catalogues/i-extended-global-catalog.service";
import ExtendedGlobalCatalogService from "../../application/services/catalogues/extended-global-catalog.service";
import { IExtendedGlobalCatalogRepository } from "../../infrastructure/repositories/contracts/catalogues/i-extended-global-catalog.repository";
import { IExtendedGlobalCatalogEntity } from "../../infrastructure/repositories/entities/catalogues/extended-global-catalog.entity";
import ExtendedGlobalCatalogRepository from "../../infrastructure/repositories/impl/catalogues/extended-global-catalog.repository";
import { ExtendedGlobalCatalogRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/extended-global-catalog.repository.base";
import { IExtendedGlobalCatalogController } from "../contracts/i-extended-global-catalog.controller";
import ExtendedGlobalCatalogController from "../controllers/catalogues/extended-global-catalog.controller";
import { IExtendedCatalogueHelperService } from "../../application/contracts/helper/i-extended-catalogue-product.helper.service";
import ExtendedCatalogueHelperService from "../../application/helpers/extended-catalogue-product.helper";
import { IUnavailableProductsService } from "../../application/contracts/catalogues/i-unavailable-products.service";
import UnavailableProductsService from "../../application/services/catalogues/unavailable-products.service";
import { IUnavailableProductsRepository } from "../../infrastructure/repositories/contracts/catalogues/i-unavailable-products.repository";
import UnavailableProductsRepository from "../../infrastructure/repositories/impl/catalogues/umavailable-products.repository";
import { UnavailableProductsRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/unavailable-products.repository.base";
import { IUnavailableProductsController } from "../contracts/i-unavailable-products.controller";
import UnavailableProductsController from "../controllers/catalogues/unavailable-products.controller";
import { IUnavailableProductsEntity } from "../../infrastructure/repositories/entities/catalogues/unavailable-products.entity";
import { ICatalogueStockService } from "../../application/contracts/catalogues/i-catalogue-stock.service";
import CatalogueStockService from "../../application/services/catalogues/catalogue-stocks.service";
import CatalogueStockController from "../controllers/catalogues/catalogue-stocks.controller";
import { ICatalogueStockController } from "../contracts/i-catalgue-stocks.controller";
import { ICatalogueStockRepository } from "../../infrastructure/repositories/contracts/catalogues/i-catalogue-stock.repository";
import { ICatalogueStockEntity } from "../../infrastructure/repositories/entities/catalogues/catalogue-stocks.entity";
import { CatalogueStockRepositoryBase } from "../../infrastructure/repositories/impl/catalogues/catalogue-stock.repository.base";
import CatalogueStockRepository from "../../infrastructure/repositories/impl/catalogues/catalogue-stock.repository";
import { ReelSalesRepositoryBase } from "../../infrastructure/repositories/impl/reel-sales/reel-sales.repository.base";
import { IReelSalesService } from "../../application/contracts/reel-sales/i-reel-sales.service";
import { ReelSalesService } from "../../application/services/reel-sales/reel-sales-service";
import { IReelSalesRepository } from "../../infrastructure/repositories/contracts/reel-sales/i-reel-sales.repository";
import { ReelSalesRepository } from "../../infrastructure/repositories/impl/reel-sales/reel-sales.repository";
import { IReelSalesController } from "../contracts/reel-sales.controller";
import { ReelSalesController } from "../controllers/reel-sales.ts/reel-sales.controller";
import { IReelSalesEntity } from "../../infrastructure/repositories/entities/reel-sales/reel-sales.entity";
import { IDimensionEntity } from "../../infrastructure/repositories/entities/size-master/dimension.entity";
import { DimensionRepositoryBase } from "../../infrastructure/repositories/impl/size-master/dimension.repository.base";
import { IDimensionRepository } from "../../infrastructure/repositories/contracts/size-master/i-dimension.repository";
import { IDimensionService } from "../../application/contracts/size-master/i-dimension.service";
import DimensionRepository from "../../infrastructure/repositories/impl/size-master/dimension.repository";
import DimensionService from "../../application/services/size-master/dimension.service";
import { IDimensionController } from "../contracts/i-dimension.controlle";
import DimensionController from "../controllers/size-master/dimension.controller";
import { ISizeMasterEntity } from "../../infrastructure/repositories/entities/size-master/size-master.entity";
import { SizeMasterRepositoryBase } from "../../infrastructure/repositories/impl/size-master/size-master.repository.base";
import SizeMasterRepository from "../../infrastructure/repositories/impl/size-master/size-master.repository";
import { ISizeMasterRepository } from "../../infrastructure/repositories/contracts/size-master/i-size-master.repository";
import { ISizeMasterService } from "../../application/contracts/size-master/i-size-master.service";
import SizeMasterService from "../../application/services/size-master/size-master.service";
import { ISizeMasterController } from "../contracts/i-size-master";
import SizeMasterController from "../controllers/size-master/size-master.controller";
const container = new Container();

container
  .bind<IRepositoryBase<ICategoryEntity>>(ContainerTypes.CategoryRepositoryBase)
  .to(CategoryRepositoryBase);
container
  .bind<ICategoryRepository>(ContainerTypes.CategoryRepository)
  .to(CategoryRepository);

container
  .bind<ICategoryService>(ContainerTypes.CategoryService)
  .to(CategoryService);
container
  .bind<ICategoryController>(ContainerTypes.CategoryController)
  .to(CategoryController);

container
  .bind<IRepositoryBase<ISubCategoryEntity>>(
    ContainerTypes.SubCategoryRepositoryBase
  )
  .to(SubCategoryRepositoryBase);
container
  .bind<ISubCategoryRepository>(ContainerTypes.SubCategoryRepository)
  .to(SubCategoryRepository);

container
  .bind<ISubCategoryService>(ContainerTypes.SubCategoryService)
  .to(SubCategoryService);
container
  .bind<ISubCategoryController>(ContainerTypes.SubCategoryController)
  .to(SubCategoryController);

container
  .bind<IRepositoryBase<IClassificationEntity>>(
    ContainerTypes.ClassificationRepositoryBase
  )
  .to(ClassificationRepositoryBase);
container
  .bind<IClassificationRepository>(ContainerTypes.ClassificationRepository)
  .to(ClassificationRepository);

container
  .bind<IClassificationService>(ContainerTypes.ClassificationService)
  .to(ClassificationService);

container
  .bind<IClassificationController>(ContainerTypes.ClassificationController)
  .to(ClassificationController);

container
  .bind<IRepositoryBase<IProductHighlightEntity>>(
    ContainerTypes.ProductHighlightRepositoryBase
  )
  .to(ProductHighlightRepositoryBase);
container
  .bind<IProductHighlightRepository>(ContainerTypes.ProductHighlightRepository)
  .to(ProductHighlightRepository);

container
  .bind<IHighlightService>(ContainerTypes.HighlightService)
  .to(HighlightService);
container
  .bind<IHighlightController>(ContainerTypes.HighlightController)
  .to(HighlightController);
container
  .bind<IHighlightHelperService>(ContainerTypes.HighlightHelperService)
  .to(HighlightHelperService);

container
  .bind<IRepositoryBase<IMediaTypeEntity>>(
    ContainerTypes.MediaTypeRepositoryBase
  )
  .to(MediaTypeRepositoryBase);
container
  .bind<IMediaTypeRepository>(ContainerTypes.MediaTypeRepository)
  .to(MediaTypeRepository);

container
  .bind<IRepositoryBase<ISeoEntity>>(ContainerTypes.SeoRepositoryBase)
  .to(SeoRepositoryBase);
container.bind<ISeoRepository>(ContainerTypes.SeoRepository).to(SeoRepository);

container
  .bind<IGlobalCatalogueService>(ContainerTypes.GlobalCatalogueService)
  .to(GlobalCatalogueService);
container
  .bind<IGlobalCatalogueController>(ContainerTypes.GlobalCatalogueController)
  .to(GlobalCatalogueController);

container
  .bind<IRepositoryBase<IGlobalCatalogueEntity>>(
    ContainerTypes.GlobalCatalogueRepositoryBase
  )
  .to(GlobalCatalogueRepositoryBase);
container
  .bind<IGlobalCatalogueRepository>(ContainerTypes.GlobalCatalogueRepository)
  .to(GlobalCatalogueRepository);

container
  .bind<IRepositoryBase<IGlobalCatalogueVariantEntity>>(
    ContainerTypes.GlobalCatalogueVariantRepositoryBase
  )
  .to(GlobalCatalogueVariantRepositoryBase);
container
  .bind<IGlobalCatalogueVariantRepository>(
    ContainerTypes.GlobalCatalogueVariantRepository
  )
  .to(GlobalCatalogueVariantRepository);

container
  .bind<IRepositoryBase<IGlobalCataloguePurchaseVariantEntity>>(
    ContainerTypes.GlobalCataloguePurchaseVariantRepositoryBase
  )
  .to(GlobalCataloguePurchaseVariantRepositoryBase);
container
  .bind<IGlobalCataloguePurchaseVariantRepository>(
    ContainerTypes.GlobalCataloguePurchaseVariantRepository
  )
  .to(GlobalCataloguePurchaseVariantRepository);

container
  .bind<IStoreCatalogueService>(ContainerTypes.StoreCatalogueService)
  .to(StoreCatalogueService);

container
  .bind<IStoreCatalogueController>(ContainerTypes.StoreCatalogueController)
  .to(StoreCatalogueController);

container
  .bind<IRepositoryBase<IStoreCatalogueEntity>>(
    ContainerTypes.StoreCatalogueRepositoryBase
  )
  .to(StoreCatalogueRepositoryBase);
container
  .bind<IStoreCatalogueRepository>(ContainerTypes.StoreCatalogueRepository)
  .to(StoreCatalogueRepository);
container
  .bind<IStoreCatalogueHelperService>(
    ContainerTypes.StoreCatalogueHelperService
  )
  .to(StoreCatalogueHelperService);

container
  .bind<IRepositoryBase<IStoreCatalogueVariantEntity>>(
    ContainerTypes.StoreCatalogueVariantRepositoryBase
  )
  .to(StoreCatalogueVariantRepositoryBase);
container
  .bind<IStoreCatalogueVariantRepository>(
    ContainerTypes.StoreCatalogueVariantRepository
  )
  .to(StoreCatalogueVariantRepository);

container
  .bind<IRepositoryBase<IStoreCataloguePurchaseVariantEntity>>(
    ContainerTypes.StoreCataloguePurchaseVariantRepositoryBase
  )
  .to(StoreCataloguePurchaseVariantRepositoryBase);
container
  .bind<IStoreCataloguePurchaseVariantRepository>(
    ContainerTypes.StoreCataloguePurchaseVariantRepository
  )
  .to(StoreCataloguePurchaseVariantRepository);

container
  .bind<IStoreCatalogueFilterService>(
    ContainerTypes.StoreCatalogueFilterService
  )
  .to(StoreCalalogueFilterService);

//reserved quantity
container
  .bind<IRepositoryBase<IReservedQuantityEntity>>(
    ContainerTypes.ReservedQuantityRepositoryBase
  )
  .to(ReservedQuantityRepositoryBase);
container
  .bind<IReservedQuantityRepository>(ContainerTypes.ReservedQuantityRepository)
  .to(ReservedQuantityRepository);

container
  .bind<IReservedQuantityService>(ContainerTypes.ReservedQuantityService)
  .to(ReservedQuantityService);

container
  .bind<IReservedQuantityController>(ContainerTypes.ReservedQuantityController)
  .to(ReservedQuantityController);

//reserved quantity
container
  .bind<IRepositoryBase<IProductExemptionEntity>>(
    ContainerTypes.ProductExemptionsRepositoryBase
  )
  .to(ProductExemptionRepositoryBase);

container
  .bind<IProductExemptionRepository>(ContainerTypes.ProductExemptionsRepository)
  .to(ProductExemptionRepository);

container
  .bind<IProductExemptionsService>(ContainerTypes.ProductExemptionsService)
  .to(ProductExemptionsService);

container
  .bind<IProductExemptionController>(ContainerTypes.ProductExemptionsController)
  .to(ProductExemptionController);

// cross selling products
container
  .bind<IRepositoryBase<ICrossSellingProductsEntity>>(
    ContainerTypes.CrossSellingProductsRepositoryBase
  )
  .to(CrossSellingProductsRepositoryBase);

container
  .bind<ICrossSellingProductsRepository>(
    ContainerTypes.CrossSellingProductsRepository
  )
  .to(CrossSellingProductsRepository);

container
  .bind<ICrossSellingProductService>(ContainerTypes.CrossSellingProductsService)
  .to(CrossSellingProductsService);

container
  .bind<ICrossSellingProductController>(
    ContainerTypes.CrossSellingProductsController
  )
  .to(CrossSellingProductsController);

container
  .bind<IGlobalCatalogueHelperService>(
    ContainerTypes.GlobalCatalogueHelpService
  )
  .to(GlobalCatalogueHelperService);
container
  .bind<IRepositoryBase<IWebCatalogueEntity>>(
    ContainerTypes.WebCatalogueRepositoryBase
  )
  .to(WebCatalogueRepositoryBase);
container
  .bind<IWebCatalogueRepository>(ContainerTypes.WebCatalogueRepository)
  .to(WebCatalogueRepository);
container
  .bind<ICatalogueService>(ContainerTypes.WebCatalogueService)
  .to(WebCatalogueService);
container
  .bind<ICatalogueController>(ContainerTypes.WebCatalogueController)
  .to(WebCatalogueController);
container
  .bind<IWebCatalogueHelperService>(ContainerTypes.WebCatalogueHelperService)
  .to(WebCatalogueHelperService);
container
  .bind<IStoreCatalogueFilterService>(ContainerTypes.WebCatalogueFilterService)
  .to(WebCalalogueFilterService),
  container
    .bind<IRepositoryBase<IWebCataloguePurchaseVariantEntity>>(
      ContainerTypes.WebCataloguePurchaseVariantRepositoryBase
    )
    .to(WebCataloguePurchaseVariantRepositoryBase);

container
  .bind<IWebCataloguePurchaseVariantRepository>(
    ContainerTypes.WebCataloguePurchaseVariantRepository
  )
  .to(WebCataloguePurchaseVariantRepository);

container
  .bind<IRepositoryBase<IWebCatalogueVariantEntity>>(
    ContainerTypes.WebCatalogueVariantRepositoryBase
  )
  .to(WebCatalogueVariantRepositoryBase);

container
  .bind<IWebCatalogueVariantRepository>(
    ContainerTypes.WebCatalogueVariantRepository
  )
  .to(WebCatalogueVariantRepository);

container
  .bind<IRepositoryBase<IMobileCatalogueEntity>>(
    ContainerTypes.MobileCatalogueRepositoryBase
  )
  .to(MobileCatalogueRepositoryBase);
container
  .bind<IMobileCatalogueRepository>(ContainerTypes.MobileCatalogueRepository)
  .to(MobileCatalogueRepository);
container
  .bind<ICatalogueService>(ContainerTypes.MobileCatalogueService)
  .to(MobileCatalogueService);
container
  .bind<ICatalogueController>(ContainerTypes.MobileCatalogueController)
  .to(MobileCatalogueController);
container
  .bind<IStoreCatalogueFilterService>(
    ContainerTypes.MobileCatalogueFilterService
  )
  .to(MobileCatalogueFilterService);
container
  .bind<IMobileCatalogueHelperService>(
    ContainerTypes.MobileCatalogueHelperService
  )
  .to(MobileCatalogueHelperService);
container
  .bind<IRepositoryBase<IMobileCataloguePurchaseVariantEntity>>(
    ContainerTypes.MobileCataloguePurchaseVariantRepositoryBase
  )
  .to(MobileCataloguePurchaseVariantRepositoryBase);
container
  .bind<IMobileCataloguePurchaseVariantRepository>(
    ContainerTypes.MobileCataloguePurchaseVariantRepository
  )
  .to(MobileCataloguePurchaseVariantRepository);
container
  .bind<IRepositoryBase<IMobileCatalogueVariantEntity>>(
    ContainerTypes.MobileCatalogueVariantRepositoryBase
  )
  .to(MobileCatalogueVariantRepositoryBase);

container
  .bind<IMobileCatalogueVariantRepository>(
    ContainerTypes.MobileCatalogueVariantRepository
  )
  .to(MobileCatalogueVariantRepository);

//pos
container
  .bind<IRepositoryBase<IPosCatalogueEntity>>(
    ContainerTypes.PosCatalogueRepositoryBase
  )
  .to(PosCatalogueRepositoryBase);
container
  .bind<IPosCatalogueRepository>(ContainerTypes.PosCatalogueRepository)
  .to(PosCatalogueRepository);
container
  .bind<ICatalogueService>(ContainerTypes.PosCatalogueService)
  .to(PosCatalogueService);
container
  .bind<ICatalogueController>(ContainerTypes.PosCatalogueController)
  .to(PosCatalogueController);
container
  .bind<IPosCatalogueHelperService>(ContainerTypes.PosCatalogueHelperService)
  .to(PosCatalogueHelperService);
container
  .bind<IStoreCatalogueFilterService>(ContainerTypes.PosCatalogueFilterService)
  .to(PosCatalogueFilterService),
  container
    .bind<IRepositoryBase<IPosCataloguePurchaseVariantEntity>>(
      ContainerTypes.PosCataloguePurchaseVariantRepositoryBase
    )
    .to(PosCataloguePurchaseVariantRepositoryBase);

container
  .bind<IPosCataloguePurchaseVariantRepository>(
    ContainerTypes.PosCataloguePurchaseVariantRepository
  )
  .to(PosCataloguePurchaseVariantRepository);

container
  .bind<IRepositoryBase<IPosCatalogueVariantEntity>>(
    ContainerTypes.PosCatalogueVariantRepositoryBase
  )
  .to(PosCatalogueVariantRepositoryBase);

container
  .bind<IPosCatalogueVariantRepository>(
    ContainerTypes.PosCatalogueVariantRepository
  )
  .to(PosCatalogueVariantRepository);

//ios
container
  .bind<IRepositoryBase<IIosCatalogueEntity>>(
    ContainerTypes.IosCatalogueRepositoryBase
  )
  .to(IosCatalogueRepositoryBase);
container
  .bind<IIosCatalogueRepository>(ContainerTypes.IosCatalogueRepository)
  .to(IosCatalogueRepository);
container
  .bind<ICatalogueService>(ContainerTypes.IosCatalogueService)
  .to(IosCatalogueService);
container
  .bind<ICatalogueController>(ContainerTypes.IosCatalogueController)
  .to(IosCatalogueController);
container
  .bind<IIosCatalogueHelperService>(ContainerTypes.IosCatalogueHelperService)
  .to(IosCatalogueHelperService);
container
  .bind<IStoreCatalogueFilterService>(ContainerTypes.IosCatalogueFilterService)
  .to(IosCatalogueFilterService),
  container
    .bind<IRepositoryBase<IIosCataloguePurchaseVariantEntity>>(
      ContainerTypes.IosCataloguePurchaseVariantRepositoryBase
    )
    .to(IosCataloguePurchaseVariantRepositoryBase);

container
  .bind<IIosCataloguePurchaseVariantRepository>(
    ContainerTypes.IosCataloguePurchaseVariantRepository
  )
  .to(IosCataloguePurchaseVariantRepository);

container
  .bind<IRepositoryBase<IIosCatalogueVariantEntity>>(
    ContainerTypes.IosCatalogueVariantRepositoryBase
  )
  .to(IosCatalogueVariantRepositoryBase);

container
  .bind<IIosCatalogueVariantRepository>(
    ContainerTypes.IosCatalogueVariantRepository
  )
  .to(IosCatalogueVariantRepository);

//android
container
  .bind<IRepositoryBase<IAndroidCatalogueEntity>>(
    ContainerTypes.AndroidCatalogueRepositoryBase
  )
  .to(AndroidCatalogueRepositoryBase);
container
  .bind<IAndroidCatalogueRepository>(ContainerTypes.AndroidCatalogueRepository)
  .to(AndroidCatalogueRepository);
container
  .bind<ICatalogueService>(ContainerTypes.AndroidCatalogueService)
  .to(AndroidCatalogueService);
container
  .bind<ICatalogueController>(ContainerTypes.AndroidCatalogueController)
  .to(AndroidCatalogueController);
container
  .bind<IAndroidCatalogueHelperService>(
    ContainerTypes.AndroidCatalogueHelperService
  )
  .to(AndroidCatalogueHelperService);
container
  .bind<IStoreCatalogueFilterService>(
    ContainerTypes.AndroidCatalogueFilterService
  )
  .to(AndroidCatalogueFilterService),
  container
    .bind<IRepositoryBase<IAndroidCataloguePurchaseVariantEntity>>(
      ContainerTypes.AndroidCataloguePurchaseVariantRepositoryBase
    )
    .to(AndroidCataloguePurchaseVariantRepositoryBase);

container
  .bind<IAndroidCataloguePurchaseVariantRepository>(
    ContainerTypes.AndroidCataloguePurchaseVariantRepository
  )
  .to(AndroidCataloguePurchaseVariantRepository);

container
  .bind<IRepositoryBase<IAndroidCatalogueVariantEntity>>(
    ContainerTypes.AndroidCatalogueVariantRepositoryBase
  )
  .to(AndroidCatalogueVariantRepositoryBase);

container
  .bind<IAndroidCatalogueVariantRepository>(
    ContainerTypes.AndroidCatalogueVariantRepository
  )
  .to(AndroidCatalogueVariantRepository);

//extended catalog
container
  .bind<IRepositoryBase<IExtendedGlobalCatalogEntity>>(
    ContainerTypes.ExtendedGlobalCatalogRepositoryBase
  )
  .to(ExtendedGlobalCatalogRepositoryBase);
container
  .bind<IExtendedGlobalCatalogRepository>(
    ContainerTypes.ExtendedGlobalCatalogRepository
  )
  .to(ExtendedGlobalCatalogRepository);

container
  .bind<IExtendedGlobalCatalogService>(
    ContainerTypes.ExtendedGlobalCatalogService
  )
  .to(ExtendedGlobalCatalogService);

container
  .bind<IExtendedGlobalCatalogController>(
    ContainerTypes.ExtendedGlobalCatalogController
  )
  .to(ExtendedGlobalCatalogController);

container
  .bind<IExtendedCatalogueHelperService>(
    ContainerTypes.ExtendedCatalogueHelperService
  )
  .to(ExtendedCatalogueHelperService);

container
  .bind<IRepositoryBase<IUnavailableProductsEntity>>(
    ContainerTypes.UnavailableProductsRepositoryBase
  )
  .to(UnavailableProductsRepositoryBase);
container
  .bind<IUnavailableProductsRepository>(
    ContainerTypes.UnavailableProductsRepository
  )
  .to(UnavailableProductsRepository);

container
  .bind<IUnavailableProductsService>(ContainerTypes.UnavailableProductsService)
  .to(UnavailableProductsService);

container
  .bind<IUnavailableProductsController>(
    ContainerTypes.UnavailableProductsController
  )
  .to(UnavailableProductsController);

container
  .bind<IRepositoryBase<ICatalogueStockEntity>>(
    ContainerTypes.CatalogueStockRepositoryBase
  )
  .to(CatalogueStockRepositoryBase);
container
  .bind<ICatalogueStockRepository>(ContainerTypes.CatalogueStockRepository)
  .to(CatalogueStockRepository);

container
  .bind<ICatalogueStockService>(ContainerTypes.CatalogueStockService)
  .to(CatalogueStockService);

container
  .bind<ICatalogueStockController>(ContainerTypes.CatalogueStockController)
  .to(CatalogueStockController);

container
  .bind<IRepositoryBase<IReelSalesEntity>>(
    ContainerTypes.ReelSalesRepositoryBase
  )
  .to(ReelSalesRepositoryBase);
container
  .bind<IReelSalesRepository>(ContainerTypes.ReelSalesRepository)
  .to(ReelSalesRepository);
container
  .bind<IReelSalesService>(ContainerTypes.ReelSalesService)
  .to(ReelSalesService);
container
  .bind<IReelSalesController>(ContainerTypes.ReelSalesController)
  .to(ReelSalesController);

//
container
  .bind<IRepositoryBase<IDimensionEntity>>(
    ContainerTypes.DimensionRepositoryBase
  )
  .to(DimensionRepositoryBase);
container
  .bind<IDimensionRepository>(ContainerTypes.DimensionRepository)
  .to(DimensionRepository);
container
  .bind<IDimensionService>(ContainerTypes.DimensionService)
  .to(DimensionService);
container
  .bind<IDimensionController>(ContainerTypes.DimensionController)
  .to(DimensionController);

container
  .bind<IRepositoryBase<ISizeMasterEntity>>(
    ContainerTypes.SizeMasterRepositoryBase
  )
  .to(SizeMasterRepositoryBase);
container
  .bind<ISizeMasterRepository>(ContainerTypes.SizeMasterRepository)
  .to(SizeMasterRepository);
container
  .bind<ISizeMasterService>(ContainerTypes.SizeMasterService)
  .to(SizeMasterService);
container
  .bind<ISizeMasterController>(ContainerTypes.SizeMasterController)
  .to(SizeMasterController);

export { container };
