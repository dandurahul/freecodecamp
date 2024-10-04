const ContainerTypes = {
  // Category
  CategoryController: Symbol.for("CategoryController"),
  CategoryService: Symbol.for("CategoryService"),
  CategoryRepository: Symbol.for("CategoryRepository"),
  CategoryRepositoryBase: Symbol.for("CategoryRepositoryBase"),

  //Sub  Category
  SubCategoryController: Symbol.for("SubCategoryController"),
  SubCategoryService: Symbol.for("SubCategoryService"),
  SubCategoryRepository: Symbol.for("SubCategoryRepository"),
  SubCategoryRepositoryBase: Symbol.for("SubCategoryRepositoryBase"),

  //Classification
  ClassificationController: Symbol.for("ClassificationController"),
  ClassificationService: Symbol.for("ClassificationService"),
  ClassificationRepository: Symbol.for("ClassificationRepository"),
  ClassificationRepositoryBase: Symbol.for("ClassificationRepositoryBase"),

  //Product highlights
  HighlightController: Symbol.for("HighlightController"),
  HighlightService: Symbol.for("HighlightService"),
  ProductHighlightRepository: Symbol.for("ProductHighlightRepository"),
  ProductHighlightRepositoryBase: Symbol.for("ProductHighlightRepositoryBase"),
  HighlightHelperService: Symbol.for("HighlightHelperService"),

  // Global Catalogues

  GlobalCatalogueController: Symbol.for("GlobalCatalogueController"),
  GlobalCatalogueService: Symbol.for("GlobalCatalogueService"),
  GlobalCatalogueRepository: Symbol.for("GlobalCatalogueRepository"),
  GlobalCatalogueRepositoryBase: Symbol.for("GlobalCatalogueRepositoryBase"),
  GlobalCatalogueVariantRepository: Symbol.for(
    "GlobalCatalogueVariantRepository"
  ),
  GlobalCatalogueVariantRepositoryBase: Symbol.for(
    "GlobalCatalogueVariantRepositoryBase"
  ),
  GlobalCataloguePurchaseVariantRepository: Symbol.for(
    "GlobalCataloguePurchaseVariantRepository"
  ),
  GlobalCataloguePurchaseVariantRepositoryBase: Symbol.for(
    "GlobalCataloguePurchaseVariantRepositoryBase"
  ),
  GlobalCatalogueHelpService: Symbol.for("GlobalCatalogueHelpService"),

  // Store Catalogues

  StoreCatalogueController: Symbol.for("StoreCatalogueController"),
  StoreCatalogueService: Symbol.for("StoreCatalogueService"),
  StoreCatalogueRepository: Symbol.for("StoreCatalogueRepository"),
  StoreCatalogueRepositoryBase: Symbol.for("StoreCatalogueRepositoryBase"),
  StoreCatalogueVariantRepository: Symbol.for(
    "StoreCatalogueVariantRepository"
  ),
  StoreCatalogueVariantRepositoryBase: Symbol.for(
    "StoreCatalogueVariantRepositoryBase"
  ),
  StoreCataloguePurchaseVariantRepository: Symbol.for(
    "StoreCataloguePurchaseVariantRepository"
  ),
  StoreCataloguePurchaseVariantRepositoryBase: Symbol.for(
    "StoreCataloguePurchaseVariantRepositoryBase"
  ),
  StoreCatalogueFilterService: Symbol.for("StoreCatalogueFilterService"),
  StoreCatalogueHelperService: Symbol.for("StoreCatalogueHelperService"),

  //Reserved Quantity
  ReservedQuantityController: Symbol.for("ReservedQuantityController"),
  ReservedQuantityService: Symbol.for("ReservedQuantityService"),
  ReservedQuantityRepository: Symbol.for("ReservedQuantityRepository"),
  ReservedQuantityRepositoryBase: Symbol.for("ReservedQuantityRepositoryBase"),

  // Media Type
  MediaTypeRepository: Symbol.for("MediaTypeRepository"),
  MediaTypeRepositoryBase: Symbol.for("MediaTypeRepositoryBase"),

  // SEO
  SeoRepository: Symbol.for("SeoRepository"),
  SeoRepositoryBase: Symbol.for("SeoRepositoryBase"),

  //Product Exemptions
  ProductExemptionsController: Symbol.for("ProductExemptionsController"),
  ProductExemptionsService: Symbol.for("ProductExemptionsService"),
  ProductExemptionsRepository: Symbol.for("ProductExemptionsRepository"),
  ProductExemptionsRepositoryBase: Symbol.for(
    "ProductExemptionsRepositoryBase"
  ),

  //cross selling products
  CrossSellingProductsController: Symbol.for("CrossSellingProductsController"),
  CrossSellingProductsService: Symbol.for("CrossSellingProductsService"),
  CrossSellingProductsRepository: Symbol.for("CrossSellingProductsRepository"),
  CrossSellingProductsRepositoryBase: Symbol.for(
    "CrossSellingProductsRepositoryBase"
  ),

  AndroidCatalogueController: Symbol.for("AndroidCatalogueController"),
  AndroidCatalogueService: Symbol.for("AndroidCatalogueService"),
  AndroidCatalogueRepositoryBase: Symbol.for("AndroidCatalogueRepositoryBase"),
  AndroidCatalogueRepository: Symbol.for("AndroidCatalogueRepository"),

  // Web Catalogue
  WebCatalogueRepositoryBase: Symbol.for("WebCatalogueRepositoryBase"),
  WebCatalogueRepository: Symbol.for("WebCatalogueRepository"),
  WebCatalogueService: Symbol.for("WebCatalogueService"),
  WebCatalogueController: Symbol.for("WebCatalogueController"),
  WebCatalogueHelperService: Symbol.for("WebCatalogueHelperService"),
  WebCatalogueFilterService: Symbol.for("WebCatalogueFilterService"),

  WebCataloguePurchaseVariantRepositoryBase: Symbol.for(
    "WebCataloguePurchaseVariantRepositoryBase"
  ),
  WebCataloguePurchaseVariantRepository: Symbol.for(
    "WebCataloguePurchaseVariantRepository"
  ),
  WebCatalogueVariantRepositoryBase: Symbol.for(
    "WebCatalogueVariantRepositoryBase"
  ),
  WebCatalogueVariantRepository: Symbol.for("WebCatalogueVariantRepository"),

  // Mobile Catalogue
  MobileCatalogueRepositoryBase: Symbol.for("MobileCatalogueRepositoryBase"),
  MobileCatalogueRepository: Symbol.for("<MobileCatalogueRepository"),
  MobileCatalogueService: Symbol.for("MobileCatalogueService"),
  MobileCatalogueController: Symbol.for("MobileCatalogueController"),
  MobileCatalogueFilterService: Symbol.for("MobileCatalogueFilterService"),
  MobileCatalogueHelperService: Symbol.for("MobileCatalogueHelperService"),
  MobileCataloguePurchaseVariantRepositoryBase: Symbol.for(
    "MobileCataloguePurchaseVariantRepositoryBase"
  ),
  MobileCataloguePurchaseVariantRepository: Symbol.for(
    "MobileCataloguePurchaseVariantRepository"
  ),
  MobileCatalogueVariantRepositoryBase: Symbol.for(
    "MobileCatalogueVariantRepositoryBase"
  ),
  MobileCatalogueVariantRepository: Symbol.for(
    "MobileCatalogueVariantRepository"
  ),

  //pos
  PosCatalogueController: Symbol.for("PosCatalogueController"),
  PosCatalogueService: Symbol.for("PosCatalogueService"),
  PosCatalogueRepository: Symbol.for("PosCatalogueRepository"),
  PosCatalogueRepositoryBase: Symbol.for("PosCatalogueRepositoryBase"),
  PosCatalogueFilterService: Symbol.for("PosCatalogueFilterService"),

  IosCatalogueController: Symbol.for("IosCatalogueController"),
  IosCatalogueService: Symbol.for("IosCatalogueService"),
  IosCatalogueRepository: Symbol.for("IosCatalogueRepository"),
  IosCatalogueRepositoryBase: Symbol.for("IosCatalogueRepositoryBase"),
  IosCatalogueFilterService: Symbol.for("IosCatalogueFilterService"),
  PosCatalogueVariantRepository: Symbol.for("PosCatalogueVariantRepository"),
  PosCatalogueHelperService: Symbol.for("PosCatalogueHelperService"),
  PosCataloguePurchaseVariantRepositoryBase: Symbol.for(
    "PosCataloguePurchaseVariantRepositoryBase"
  ),
  PosCatalogueVariantRepositoryBase: Symbol.for(
    "PosCatalogueVariantRepositoryBase"
  ),
  PosCataloguePurchaseVariantRepository: Symbol.for(
    "PosCataloguePurchaseVariantRepository"
  ),
  IosCatalogueHelperService: Symbol.for("IosCatalogueHelperService"),
  IosCataloguePurchaseVariantRepositoryBase: Symbol.for(
    "IosCataloguePurchaseVariantRepositoryBase"
  ),
  IosCataloguePurchaseVariantRepository: Symbol.for(
    "IosCataloguePurchaseVariantRepository"
  ),
  IosCatalogueVariantRepositoryBase: Symbol.for(
    "IosCatalogueVariantRepositoryBase"
  ),
  IosCatalogueVariantRepository: Symbol.for("IosCatalogueVariantRepository"),
  AndroidCatalogueHelperService: Symbol.for("AndroidCatalogueHelperService"),
  AndroidCatalogueFilterService: Symbol.for("AndroidCatalogueFilterService"),
  AndroidCataloguePurchaseVariantRepositoryBase: Symbol.for(
    "AndroidCataloguePurchaseVariantRepositoryBase"
  ),
  AndroidCataloguePurchaseVariantRepository: Symbol.for(
    "AndroidCataloguePurchaseVariantRepository"
  ),
  AndroidCatalogueVariantRepositoryBase: Symbol.for(
    "AndroidCatalogueVariantRepositoryBase"
  ),
  AndroidCatalogueVariantRepository: Symbol.for(
    "AndroidCatalogueVariantRepository"
  ),
  ExtendedGlobalCatalogController: Symbol.for(
    "ExtendedGlobalCatalogController"
  ),
  ExtendedGlobalCatalogService: Symbol.for("ExtendedGlobalCatalogService"),
  ExtendedGlobalCatalogRepository: Symbol.for(
    "ExtendedGlobalCatalogRepository"
  ),
  ExtendedGlobalCatalogRepositoryBase: Symbol.for(
    "ExtendedGlobalCatalogRepositoryBase"
  ),
  ExtendedCatalogueHelperService: Symbol.for("ExtendedCatalogueHelperService"),

  UnavailableProductsController: Symbol.for("UnavailableProductsController"),
  UnavailableProductsService: Symbol.for("UnavailableProductsService"),
  UnavailableProductsRepository: Symbol.for("UnavailableProductsRepository"),
  UnavailableProductsRepositoryBase: Symbol.for(
    "UnavailableProductsRepositoryBase"
  ),

  CatalogueStockController: Symbol.for("CatalogueStockController"),
  CatalogueStockService: Symbol.for("CatalogueStockService"),
  CatalogueStockRepository: Symbol.for("CatalogueStockRepository"),
  CatalogueStockRepositoryBase: Symbol.for("CatalogueStockRepositoryBase"),

  ReelSalesController: Symbol.for("ReelSalesControlle"),
  ReelSalesService: Symbol.for("ReelSalesService"),
  ReelSalesRepository: Symbol.for("ReelSalesRepository"),
  ReelSalesRepositoryBase: Symbol.for("ReelSalesRepositoryBase"),

  // Size Master
  SizeMasterController: Symbol.for("SizeMasterController"),
  SizeMasterService: Symbol.for("SizeMasterService"),
  SizeMasterRepository: Symbol.for("SizeMasterRepository"),
  SizeMasterRepositoryBase: Symbol.for("SizeMasterRepositoryBase"),

  // Dimension
  DimensionController: Symbol.for("DimensionController"),
  DimensionService: Symbol.for("DimensionService"),
  DimensionRepository: Symbol.for("DimensionRepository"),
  DimensionRepositoryBase: Symbol.for("DimensionRepositoryBase"),
};

export { ContainerTypes };
