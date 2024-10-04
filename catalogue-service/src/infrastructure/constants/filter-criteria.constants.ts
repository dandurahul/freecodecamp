export const filterCriteriaForGlobalCatalog = [
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
    filterKey: "highlightId",
    targetKey: "highlights",
    isArray: false,
  },
];

export const filterCriteriaForCatalogueStock = [
  {
    filterKey: "entityInternalIds",
    targetKey: "stores.entityInternalId",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "itemCodes",
    targetKey: "itemCode",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "businessUnitId",
    targetKey: "businessUnitId",
    isArray: false,
  },
  {
    filterKey: "productIds",
    targetKey: "productId",
    isArray: true,
    operator: "$in",
  },
];

export const filterCriteriaForUnavailableProduct = [
  {
    filterKey: "erpSource",
    targetKey: "erpSource",
    isArray: false,
  },
  {
    filterKey: "erpId",
    targetKey: "erpId",
    isArray: true,
    operator: "$in",
  },
];

export const filterCriteriaForExemptions = [
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

export const filterCriteriaForCategory = [
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

export const filterCriteriaForSubCategory = [
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

export const filterCriteriaForClassification = [
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
    filterKey: "classificationName",
    targetKey: "classificationName",
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

export const filterCriteriaForCrossSellingProducts = [
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
];

export const filterCriteriaForReservedQuantity = [
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

export const filterCriteriaForCatalog = [
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

export const filterCriteriaForExtendedGlobalCatalog = [
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
    filterKey: "secondaryCategory",
    targetKey: "secondaryCategory",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "secondarySubCategory",
    targetKey: "secondarySubCategory",
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
    filterKey: "classificationId",
    targetKey: "classificationId",
    isArray: false,
  },
  {
    filterKey: "activeFlag",
    targetKey: "activeFlag",
    isArray: false,
  },
];

export const filterCriteriaForProductHighlight = [
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
    filterKey: "highlightName",
    targetKey: "productHighlight",
    isSearchKey: true,
    operator: "$regex",
    options: "$options",
  },
];

export const filterCriteriaForDimension = [
  {
    filterKey: "id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "dimensionId",
    targetKey: "dimensionId",
    isArray: false,
  },
];

export const filterCriteriaForSizeMaster = [
  {
    filterKey: "id",
    targetKey: "_id",
    isArray: false,
  },
  {
    filterKey: "dimensionId",
    targetKey: "dimensionId",
    isArray: false,
  },
];
export const filterConditions = [
  {
    filterKey: "ids",
    targetKey: "_id",
    isArray: true,
    operator: "$in",
  },
  {
    filterKey: "businessUnitId",
    targetKey: "businessUnitId",
    isArray: true,
    operator: "$in",
  },
];
