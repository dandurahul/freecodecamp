enum FilterTypeEnum {
  WEBLIST_WITH_COUNT = "WebListWithCount",
  WEBLIST_WITH_HIGHLIGHT_SYNC = "WebListWithCount",
  DROPDOWN = "Dropdown",
  PRODUCT_NOT_ALLOWED_DROPDOWN = "ProductNotAllowedDropdown",
  PRODUCT_DETAILS = "ProductDetails",
  BY_PRODUCT_IDS = "ByProductIds",
  PRODUCTIDS = "ProductIds",
  META_DATA = "MetaData",
  NO_POPULATE = "NO_POPULATE",
  SEARCH_BY_KEY = "SearchByKey",
  BULK_DATA = "BULK_DATA",
  FOR_ECOMMERCE_CATEGORIES = "ForEcommerceCategories",
  DETAILS_WITH_PRODUCT_ALLOWED = "DataWithProductAllowed",
  CATALOGUE_DETAILS_WITH_CATEGORY_IDS = "CatalogueDetailsWithCategoryIds",
  VARIANTS_DATA = "VariantsData",
  POPULATE_SUB_CATEGORY_DATA = "categoryId webMedia mobileMedia posMedia seo",
  POPULATE_CATEGORY_DATA = "webMedia mobileMedia posMedia seo",
  STOCKLIMITHAND = "StockLimitHand",

  IMPORT_EXPORT = "importExport",
  FIELDS_CATEGORY_DROPDOWN = "_id categoryName",
  FIELDS_CATEGORY_PRODUCT_ALLOWED = "_id categoryName productAllowed orderValue",

  FIELDS_CLASSIFICATION_DROPDOWN = "_id classificationName",
  FIELDS_CLASSIFICATION_PRODUCT_ALLOWED = "_id classificationName categoryId subCategoryId",
  POPULATE_CLASSIFICATION_SEARCH_KEY = "subCategoryId categoryId",
  POPULATE_CLASSIFICATION_WEB = "categoryId subCategoryId webMedia mobileMedia posMedia seo",
  POPULATE_CLASSIFICATION_DATA = "webMedia mobileMedia posMedia seo categoryId",

  FIELDS_SUBCATEGORY_DROPDOWN = "_id subCategoryName",
  FIELDS_SUBCATEGORY_PRODUCT_ALLOWED = "_id subCategoryName categoryId productAllowed",
  POPULATE_SUBCATEGORY_SEARCH_KEY = "categoryId",
  POPULATE_CATEGORY_WEBLIST = "webMedia mobileMedia posMedia seo",
  POPULATE_SUB_CATEGORY_WEBLIST = "categoryId webMedia mobileMedia posMedia seo",

  FIELDS_HIGHLIGHT_DROPDOWN = "_id productHighlight productHighlightCode",
  POPULATE_HIGHLIGHT_WEBLIST = "webBanner mobileBanner seo",

  FIELDS_GLOBAL_CATALOG_META = "_id productId category subCategory classification highlights activeFlag deleteFlag",
  POPULATE_GLOBAL_CATALOG_WITH_VARIANTS = "category subCategory classification variants",
  POPULATE_GLOBAL_CATALOG_WEBLIST = "category subCategory classification",
  POPULATE_GLOBAL_CATALOG_DETAILS = "category subCategory classification variants purchaseVariants seo",
  FIELDS_PRODUCTIDS = "id productId",
  FIELDS_EXTENTED_PRODUCTIDS = "id, globalCatalogue, productId",
  FIELDS_STORE_CATALOG_META = "_id entityInternalId productId highlights activeFlag deleteFlag",
  POPULATE_STORE_CATALOG_WITH_VARIANTS = "category subCategory classification variants",
  POPULATE_STORE_CATALOG_WEBLIST = "category subCategory classification",
  POPULATE_STORE_CATALOG_DETAILS = "category subCategory classification variants purchaseVariants seo",
  POPULATE_EXTENDED_CATALOG = "categoryId subCategoryId classificationId globalCatalogue",

  FIELDS_EXTENDED_GLOBAL_CATALOG_META = "_id globalCatalogue productId categoryId subCategoryId secondaryCategory secondarySubCategory",
}

export const filterConditionsForGlobalCatalog = [
  {
    filterKey: "id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "entityInternalId",
    targetKey: "entityInternalId",
    isArray: false,
  },
  {
    filterKey: "ids",
    targetKey: "_id",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "productId",
    targetKey: "productId",
    isArray: false,
  },
  {
    filterKey: "productIds",
    targetKey: "productId",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "entityInternalId",
    targetKey: "entityInternalId",
    isArray: false,
  },
  {
    filterKey: "categoryIds",
    targetKey: "category",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "categoryId",
    targetKey: "category",
    isArray: false,
  },
  {
    filterKey: "subCategoryIds",
    targetKey: "subCategory",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "subCategoryId",
    targetKey: "subCategory",
    isArray: false,
  },
  {
    filterKey: "classificationIds",
    targetKey: "classification",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "classificationId",
    targetKey: "classification",
    isArray: false,
  },
  {
    filterKey: "categoryName",
    targetKey: "categoryName",
    isSearchKey: true,
    operator: "$regex",
    options: "$options",
  },
  {
    filterKey: "subCategoryName",
    targetKey: "subCategoryName",
    isSearchKey: true,
    operator: "$regex",
    options: "$options",
  },
  {
    filterKey: "classificationName",
    targetKey: "classificationName",
    isSearchKey: true,
    operator: "$regex",
    options: "$options",
  },
  {
    filterKey: "categoryNames",
    targetKey: "categoryName",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "subCategoryNames",
    targetKey: "subCategoryName",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "classificationNames",
    targetKey: "classificationName",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "highlights",
    targetKey: "highlights",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "businessUnitId",
    targetKey: "businessUnitId",
    isArray: false,
  },
  {
    filterKey: "highlightId",
    targetKey: "highlights",
    isArray: false,
  },
];

export const filterConditionsForExemptions = [
  {
    filterKey: "id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "exemptionsType",
    targetKey: "exemptionsType",
    isArray: false,
  },
  {
    filterKey: "offeringAllowed",
    targetKey: "offeringAllowed",
    isArray: false,
  },
  {
    filterKey: "conditionAllowed",
    targetKey: "conditionAllowed",
    isArray: false,
  },
  {
    filterKey: "activeFlag",
    targetKey: "activeFlag",
    isArray: false,
  },
  {
    filterKey: "productIds",
    targetKey: "productIds",
    isArray: false,
  },
];

export const filterConditionsForCategory = [
  {
    filterKey: "categoryIds",
    targetKey: "_id",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "categoryNames",
    targetKey: "categoryName",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "businessUnitId",
    targetKey: "businessUnitId",
    isArray: false,
  },
];

export const filterConditionsForSubCategory = [
  {
    filterKey: "subCategoryIds",
    targetKey: "_id",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "categoryIds",
    targetKey: "categoryId",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "categoryId",
    targetKey: "categoryId",
    isArray: false,
  },
  {
    filterKey: "activeFlag",
    targetKey: "activeFlag",
    isArray: false,
  },
  {
    filterKey: "subCategoryNames",
    targetKey: "subCategoryName",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "businessUnitId",
    targetKey: "businessUnitId",
    isArray: false,
  },
];

export const filterConditionsForClassification = [
  {
    filterKey: "id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "_id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "classificationIds",
    targetKey: "_id",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "categoryIds",
    targetKey: "categoryId",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "categoryId",
    targetKey: "categoryId",
    isArray: false,
  },
  {
    filterKey: "subCategoryIds",
    targetKey: "subCategoryId",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "subCategoryId",
    targetKey: "subCategoryId",
    isArray: false,
  },
  {
    filterKey: "activeFlag",
    targetKey: "activeFlag",
    isArray: false,
  },
  {
    filterKey: "businessUnitId",
    targetKey: "businessUnitId",
    isArray: false,
  },
];

export const filterConditionsForCrossSellingProducts = [
  {
    filterKey: "id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "productId",
    targetKey: "productId",
    isArray: false,
  },
  {
    filterKey: "productIds",
    targetKey: "productIds",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "businessUnitId",
    targetKey: "businessUnitId",
    isArray: false,
  },
];

export const filterConditionsForReservedQuantity = [
  {
    filterKey: "id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "productId",
    targetKey: "productId",
    isArray: false,
  },
  {
    filterKey: "entityInternalId",
    targetKey: "entityInternalId",
    isArray: false,
  },
  {
    filterKey: "status",
    targetKey: "status",
    isArray: false,
  },
  {
    filterKey: "storeProductId",
    targetKey: "storeProductId",
    isArray: false,
  },
  {
    filterKey: "orderId",
    targetKey: "orderId",
    isArray: false,
  },
  {
    filterKey: "productIds",
    targetKey: "productId",
    isArray: true,
    operator: "$in",
  },
];

export const filterConditionsForCatalog = [
  {
    filterKey: "id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "productIds",
    targetKey: "productId",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "productId",
    targetKey: "productId",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "entityInternalId",
    targetKey: "entityInternalId",
    isArray: false,
  },
  {
    filterKey: "entityInternalIds",
    targetKey: "entityInternalId",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "highlightIds",
    targetKey: "highlights",
    isArray: true,
    operator: "$in",
  },
];

export const filterConditionsForProductHighlight = [
  {
    filterKey: "id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "productHighlights",
    targetKey: "productHighlight",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "businessUnitId",
    targetKey: "businessUnitId",
    isArray: false,
  },
  {
    filterKey: "highlightName",
    targetKey: "productHighlight",
    isSearchKey: true,
    operator: "$regex",
    options: "$options",
  },
];

export default FilterTypeEnum;
