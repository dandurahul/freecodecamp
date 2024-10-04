import { FilterConstants } from "../../../application/constants/filter.constants";
import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import FilterTypeEnum, {
  filterConditionsForCatalog,
  filterConditionsForGlobalCatalog,
} from "../../enums/filter.enum";
import { FilterBase } from "../entities/filter/filter.base";

export function buildFilterObjectForWebCatalogues(
  filterCriteria: Object,
  filterType?: string,
  fetchType?: string | undefined
) {
  return getFilterByFilterType(filterCriteria, filterType, fetchType);
}

function getFilterByFilterType(
  filterCriteria: Object,
  filterType?: string,
  fetchType?: string | undefined
): FilterBase | undefined {
  switch (filterType) {
    case FilterTypeEnum.PRODUCT_DETAILS: {
      return getFilterForDetails(filterCriteria);
    }
    case FilterTypeEnum.BY_PRODUCT_IDS: {
      return getFilteredProductIds(filterCriteria);
    }
    case FilterTypeEnum.IMPORT_EXPORT: {
      return getFilteredProductsForImportExport(filterCriteria);
    }
    default: {
      let { filter, aggregate } = buildRequestObjectForGlobalCatalog(
        filterCriteria,
        filterType,
        fetchType
      );
      return getFilterForWebList(filter, aggregate, filterType);
    }
  }
}

function getFilterForDetails(filterCriteria: any): FilterBase {
  filterCriteria.deleteFlag = false;
  return {
    filter: filterCriteria,
    fields: "",
    populate: buildPopulateWithVariants() as any,
    aggregate: "",
    sort: "",
    populateFields: "",
  };
}

function getFilteredProductIds(filterCriteria: any): FilterBase {
  filterCriteria.deleteFlag = false;
  if (filterCriteria.productIds) {
    filterCriteria.productId = { $in: filterCriteria.productIds };
  }
  filterCriteria.productIds = undefined;
  return {
    filter: filterCriteria,
    fields: "id productId globalCatalogue",
    populate: "",
    aggregate: "",
    sort: "",
    populateFields: "",
  };
}

function getFilteredProductsForImportExport({
  itemCodes,
  ...filterCriteria
}: any): any {
  filterCriteria.deleteFlag = false;
  return {
    filter: filterCriteria,
    fields: "",
    populate: {
      path: "variants",
      match: { itemCode: { $in: itemCodes } },
    },
    aggregate: "",
    sort: "",
    populateFields: "",
  };
}

function buildRequestObjectForGlobalCatalog(
  serialized: any,
  filterType: string | undefined,
  fetchType?: string | undefined
): FilterBase {
  let catalogObject: any;
  let aggregate: any;
  let entityInternalId = serialized?.entityInternalId;
  if (filterType === FilterConstants.CHECK_VARIANTS) {
    aggregate = fetchActiveStoreProductsByProductIds(
      entityInternalId,
      serialized,
      fetchType
    );
  } else if (filterType === FilterConstants.SUGGESTIONS) {
    // let categorization: any = filterCatalog(serialized);
    // aggregate = generateAggregationQuery(categorization);
  } else {
    catalogObject = getObjectForFilterQuery(
      serialized,
      filterConditionsForCatalog
    );
    catalogObject.deleteFlag = false;
  }
  return {
    filter: catalogObject || {},
    aggregate: aggregate || undefined,
  };
}

function getFilterForWebList(
  filterCriteria: any,
  aggregate: any,
  filterType: string | undefined
): FilterBase {
  let populate: any;
  if (filterType === FilterConstants.FOR_IRETAIL) {
    populate = buildPopulateWithOnlyVariants();
  } else if (filterType === FilterConstants.WITH_VARIANTS) {
    populate = buildPopulateWithVariants();
  } else {
    populate = buildPopulateWithOutVariants();
  }
  return {
    filter: filterCriteria,
    fields: "",
    populate: populate,
    aggregate: aggregate ? aggregate : undefined,
    sort: "",
    populateFields: "",
  };
}

export const buildPopulateWithOnlyVariants = () => {
  return [
    {
      path: "variants",
      model: "StoreCatalogueVariant",
    },
  ];
};

export const buildPopulateWithOutVariants = () => {
  return [
    {
      path: "globalCatalogue",
      populate: [
        {
          path: "category",
          model: "Category",
        },
        {
          path: "subCategory",
          model: "SubCategory",
        },
      ],
    },
  ];
};

export const buildPopulateWithVariants = () => {
  return [
    {
      path: "globalCatalogue",
      populate: [
        {
          path: "category",
          model: "Category",
        },
        {
          path: "subCategory",
          model: "SubCategory",
        },
        {
          path: "variants",
          model: "GlobalCatalogVariant",
        },
      ],
    },
    {
      path: "variants",
      model: "WebCatalogueVariant",
    },
    {
      path: "storeCatalogue",
      model: "StoreProduct",
    },
  ];
};

function fetchActiveStoreProductsByProductIds(
  entityInternalId: string | undefined,
  product: any,
  fetchType?: string | undefined
) {
  let outOfStockProductsAllowed = product?.outOfStockProductsAllowed;
  let productIds = product?.productIds ? product.productIds : [];
  let startPrice = product?.priceRange?.startPrice
    ? parseInt(product.priceRange.startPrice)
    : 0;
  let endPrice = product?.priceRange?.endPrice
    ? parseInt(product.priceRange.endPrice)
    : 0;
  try {
    let aggregationPipeline: any = [
      {
        $addFields: {
          entityInternalId: { $toString: "$entityInternalId" },
          productId: { $toString: "$productId" },
        },
      },
      {
        $match: {
          entityInternalId: entityInternalId,
          deleteFlag: false,
        },
      },
      {
        $match: {
          productId: { $in: productIds?.map((item: any) => String(item)) },
        },
      },
      {
        $lookup: {
          from: "WebCatalogueVariant",
          localField: "variants",
          foreignField: "_id",
          as: "variants",
        },
      },
      { $unwind: "$variants" },
      {
        $match: {
          "variants.salesPrice": { $gte: startPrice, $lte: endPrice },
        },
      },
      { $match: { "variants.salesPrice": { $gt: 0 } } },
      {
        $match: {
          $or: [
            {
              $or: [
                { "variants.stockType": { $eq: "1" } },
                { "variants.stockType": { $eq: "2" } },
              ],
            },
            {
              $and: [
                {
                  $or: [
                    { "variants.stockType": { $eq: "3" } },
                    { "variants.stockType": { $eq: "4" } },
                  ],
                },
                { "variants.stockBalance": { $gt: 0 } },
              ],
            },
          ],
        },
      },
      { $project: { productId: 1, _id: 0 } },
    ];
    if (outOfStockProductsAllowed === true) {
      aggregationPipeline.splice(6, 0, {
        $match: {
          $or: [
            {
              $and: [{ "variants.stockType": { $eq: "0" } }],
            },
            {
              $or: [
                { "variants.stockType": { $eq: "1" } },
                { "variants.stockType": { $eq: "2" } },
              ],
            },
            {
              $and: [
                {
                  $or: [
                    { "variants.stockType": { $eq: "3" } },
                    { "variants.stockType": { $eq: "4" } },
                  ],
                },
                { "variants.stockBalance": { $gte: 0 } },
              ],
            },
          ],
        },
      });
    }
    if (
      fetchType === FilterConstants.IGNORE_PRODUCTIDS &&
      outOfStockProductsAllowed === true
    ) {
      aggregationPipeline = [
        ...aggregationPipeline.slice(0, 2),
        ...aggregationPipeline.slice(3, 5),
        ...aggregationPipeline.slice(6, 8),
        ...aggregationPipeline.slice(9),
      ];
    } else if (fetchType === FilterConstants.IGNORE_PRODUCTIDS) {
      aggregationPipeline.splice(5, 1);
      aggregationPipeline.splice(2, 1);
    } else if (outOfStockProductsAllowed === true) {
      aggregationPipeline = [
        ...aggregationPipeline.slice(0, 5),
        ...aggregationPipeline.slice(6, 8),
        ...aggregationPipeline.slice(9),
      ];
    } else if (!product?.priceRange) {
      aggregationPipeline.splice(5, 1);
    }
    return aggregationPipeline;
  } catch (err: any) {
    throw err;
  }
}
