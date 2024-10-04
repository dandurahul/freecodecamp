import { Types } from "mongoose";
import { FilterConstants } from "../../../application/constants/filter.constants";
import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { FilterBase } from "../entities/filter/filter.base";
import FilterTypeEnum from "../../enums/filter.enum";
import { filterCriteriaForCatalog } from "../../constants/filter-criteria.constants";

export function buildFilterObjectForStoreCatalogues(
  filterCriteria: Object,
  filterType?: string,
  fetchType?: string | undefined
): FilterBase | undefined {
  const filterFunction = getFilterFunctionForStoreCatalogues(filterType || "");
  return filterFunction(filterCriteria, fetchType);
}

function getFilterFunctionForStoreCatalogues(filterType: string) {
  const filterFunctions: Record<
    string,
    (
      filterCriteria: Object,
      fetchType?: string | undefined
    ) => FilterBase | undefined
  > = {
    [FilterTypeEnum.PRODUCT_DETAILS]: (filterCriteria) =>
      getFilterForDetails(filterCriteria),
    [FilterTypeEnum.BY_PRODUCT_IDS]: (filterCriteria) =>
      getFilteredProductIds(filterCriteria),
    [FilterTypeEnum.META_DATA]: (filterCriteria) =>
      fetchMetaData(filterCriteria),
    [FilterTypeEnum.IMPORT_EXPORT]: (filterCriteria) =>
      getFilteredProductsForImportExport(filterCriteria),
    [FilterTypeEnum.STOCKLIMITHAND]: (filterCriteria: any) =>
      getStockHandProduct(filterCriteria),
    default: (filterCriteria: any, fetchType) => {
      let {
        outOfStockProductsAllowed,
        reservedQuantities,
        minPrice,
        maxPrice,
        itemCodes,
      } = filterCriteria;
      const { filter, aggregate } = buildRequestObjectForGlobalCatalog(
        filterCriteria,
        filterType,
        fetchType
      );
      return getFilterForWebList(
        filter,
        aggregate,
        filterType,
        outOfStockProductsAllowed,
        reservedQuantities,
        { minPrice, maxPrice, itemCodes }
      );
    },
  };
  return filterFunctions[filterType] || filterFunctions.default;
}

function getFilterForWebList(
  filterCriteria: any,
  aggregate: any,
  filterType: string,
  outOfStockProductsAllowed: any,
  reservedQuantities: any,
  priceFilter: any
): FilterBase {
  const populateMap: Record<string, Function> = {
    [FilterConstants.FOR_IRETAIL]: buildPopulateWithOnlyVariants,
    [FilterConstants.WITH_VARIANTS]: buildPopulateWithVariants,
    default: buildPopulateWithOutVariants,
  };
  if (filterType == FilterConstants.CHECK_WITH_VARIANT) {
    aggregate = aggregateCheckWithVariant(
      filterCriteria,
      outOfStockProductsAllowed,
      reservedQuantities,
      priceFilter
    );
  }
  let populate = populateMap[filterType] || populateMap.default;
  return {
    filter: filterCriteria,
    populate: populate(),
    aggregate: aggregate,
  };
}

function getFilterForDetails(filterCriteria: any): FilterBase {
  filterCriteria.deleteFlag = false;
  return {
    filter: filterCriteria,
    populate: buildPopulateWithVariants() as any,
  };
}

function getFilteredProductsForImportExport({
  itemCodes,
  ...filterCriteria
}: any): any {
  filterCriteria.filterCriteria = false;
  return {
    filter: filterCriteria,
    aggregate: [
      {
        $lookup: {
          from: "StoreCatalogueVariant",
          localField: "variants",
          foreignField: "_id",
          as: "variants",
        },
      },
      { $unwind: "$variants" },
      {
        $match: {
          "variants.itemCode": { $in: itemCodes },
          entityInternalId: new Types.ObjectId(filterCriteria.entityInternalId),
        },
      },
    ],
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
  };
}

function fetchMetaData(filterCriteria: any): FilterBase {
  let { filter } = buildRequestObjectForGlobalCatalog(filterCriteria, "");
  return {
    filter: filter,
    fields: FilterTypeEnum.FIELDS_STORE_CATALOG_META,
  };
}

export const buildPopulateWithVariants = () => {
  return [
    {
      path: "globalCatalogue",
      populate: [
        {
          path: "category",
          model: FilterConstants.CATEGORY,
        },
        {
          path: "subCategory",
          model: FilterConstants.SUB_CATEGORY,
        },
        {
          path: "variants",
          model: FilterConstants.GLOBAL_CATALOG_VARIANT,
        },
      ],
    },
    {
      path: "variants",
      model: FilterConstants.STORE_CATALOG_VARIANT,
    },
  ];
};

export const buildPopulateWithOnlyVariants = () => {
  return [
    {
      path: "variants",
      model: FilterConstants.STORE_CATALOG_VARIANT,
    },
  ];
};

const aggregateCheckWithVariant = (
  filterCriteria: any,
  outOfStockProductsAllowed: any,
  reservedQuantities: any,
  priceFilter: any
) => {
  const priceMatchStage: any = {};

  if (priceFilter?.minPrice) {
    priceMatchStage[`variants.salesPrice`] = {
      $gte: priceFilter?.minPrice,
    };
  }

  if (priceFilter?.maxPrice) {
    priceMatchStage[`variants.salesPrice`] = {
      ...priceMatchStage[`variants.salesPrice`],
      $lte: priceFilter?.maxPrice,
    };
  }

  if (filterCriteria?.highlights) {
    filterCriteria.highlights["$in"] = filterCriteria.highlights["$in"]?.map(
      (e: any) => new Types.ObjectId(e)
    );
  }

  let pipeline: any = [
    {
      $addFields: {
        entityInternalId: { $toString: "$entityInternalId" },
        productId: { $toString: "$productId" },
      },
    },
    {
      $match: filterCriteria,
    },
    {
      $lookup: {
        from: FilterConstants.STORE_CATALOG_VARIANT,
        localField: "variants",
        foreignField: "_id",
        as: "variants",
      },
    },
    {
      $match: priceMatchStage,
    },
  ];

  if (priceFilter?.itemCodes) {
    priceMatchStage[`variants.itemCode`] = {
      $in: priceFilter?.itemCodes,
    };
  }

  if (outOfStockProductsAllowed === true) {
    pipeline.push({
      $match: {
        "variants.salesPrice": { $gt: 0 },
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
              // { "variants.stockBalance": { $gte: 0 } },
            ],
          },
        ],
      },
    });
  } else {
    pipeline.push(
      {
        $addFields: {
          reservedQuantity: {
            $arrayElemAt: [
              {
                $filter: {
                  input: reservedQuantities,
                  as: "reserved",
                  cond: { $eq: ["$$reserved._id", "$productId"] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $match: {
          "variants.salesPrice": { $gt: 0 },
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
                {
                  $expr: {
                    $gt: [
                      {
                        $subtract: [
                          { $arrayElemAt: ["$variants.stockBalance", 0] },
                          {
                            $sum: [
                              { $arrayElemAt: ["$variants.sohLimit ", 0] },
                              "$reservedQuantity.reservedQuantity",
                            ],
                          },
                        ],
                      },
                      0,
                    ],
                  },
                },
              ],
            },
          ],
        },
      }
    );
  }

  return pipeline;
};

export const buildPopulateWithOutVariants = () => {
  return [
    {
      path: "globalCatalogue",
      populate: [
        {
          path: "category",
          model: FilterConstants.CATEGORY,
        },
        {
          path: "subCategory",
          model: FilterConstants.SUB_CATEGORY,
        },
        {
          path: "classification",
          model: FilterConstants.CLASSIFICATION,
        },
        {
          path: "classification",
          model: "Classification",
        },
      ],
    },
  ];
};

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
  } else {
    catalogObject = getObjectForFilterQuery(
      serialized,
      filterCriteriaForCatalog
    );
    catalogObject.deleteFlag = false;
  }
  return {
    filter: catalogObject || {},
    aggregate: aggregate || undefined,
  };
}

function fetchActiveStoreProductsByProductIds(
  entityInternalId: string | undefined,
  product: any,
  fetchType?: string | undefined
) {
  let outOfStockProductsAllowed = product?.outOfStockProductsAllowed;
  let productIds = product?.productIds || [];
  let startPrice = parseInt(product?.priceRange?.startPrice ?? "0");
  let endPrice = parseInt(product?.priceRange?.endPrice ?? "0");

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
          from: FilterConstants.STORE_CATALOG_VARIANT,
          localField: "variants",
          foreignField: FilterConstants.FOREIGN_ID,
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
      {
        $project: { productId: 1, _id: 1, salesPrice: "$variants.salesPrice" },
      },
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

function getStockHandProduct({
  entityInternalId,
}: {
  entityInternalId: string;
}) {
  return {
    filter: {},
    aggregate: [
      {
        $addFields: {
          entityInternalId: { $toString: "$entityInternalId" },
        },
      },
      {
        $match: {
          entityInternalId: entityInternalId,
          deleteFlag: false,
        },
      },
      {
        $lookup: {
          from: FilterConstants.STORE_CATALOG_VARIANT,
          localField: "variants",
          foreignField: FilterConstants.FOREIGN_ID,
          as: "variants",
        },
      },
      { $unwind: "$variants" },
      {
        $match: {
          "variants.stockType": { $ne: "1" },
          $expr: { $lt: ["$variants.sohLimit", "$variants.stockBalance"] },
        },
      },
    ],
  };
}
