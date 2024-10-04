import { FilterBase } from "../entities/filter/filter.base";
import {
  isValidArray,
  getObjectForFilterQuery,
} from "../../../application/utils/filter-functions";
import { FilterConstants } from "../../../application/constants/filter.constants";
import { filterCriteriaForGlobalCatalog } from "../../constants/filter-criteria.constants";
import FilterTypeEnum from "../../enums/filter.enum";

export function buildFilterForBusinessUnit(filterCriteria: any, filter?: any) {
  if (filterCriteria?.businessUnitId) {
    filter.businessUnitId =
      filterCriteria?.businessUnitId || process.env.BUSINESS_UNIT_ID;
    return filter;
  } else {
    return filter;
  }
}

export function buildFilterObjectForGlobalCatalogues(
  filterCriteria: Object | undefined,
  filterType?: string,
  page?: number,
  pageSize?: number
): FilterBase | undefined {
  const filterFunction = getFilterFunction(filterType || "");
  return filterFunction(filterCriteria, page, pageSize, filterType);
}

function getFilterFunction(filterType: string) {
  const filterFunctions: any = {
    [FilterTypeEnum.PRODUCT_DETAILS]: (filterCriteria: any) =>
      getFilterForDetails(filterCriteria),
    [FilterTypeEnum.BY_PRODUCT_IDS]: (filterCriteria: any) =>
      getFilteredProductIds(filterCriteria),
    [FilterTypeEnum.CATALOGUE_DETAILS_WITH_CATEGORY_IDS]: () =>
      getGlobalCatalogueListWithOnlyCategoryIds(),
    [FilterTypeEnum.NO_POPULATE]: (filterCriteria: any) =>
      fetchMetaData(filterCriteria),
    [FilterTypeEnum.DROPDOWN]: (filterCriteria: any) =>
      fetchDropDownData(filterCriteria),
    default: (
      filterCriteria: Object,
      page: number,
      pageSize: number,
      filterType: string
    ) => {
      const { filter, aggregate } = buildRequestObjectForGlobalCatalog(
        filterCriteria,
        page,
        pageSize,
        filterType
      );
      return getFilterForWebList(filter, aggregate, filterType);
    },
  };
  return filterFunctions[filterType] || filterFunctions.default;
}

export function getAggregateQueryForSuggestions(
  searchCriteria: Object | undefined,
  filterType: string | undefined
) {
  let aggregate;
  let filter: any = {};
  if (filterType === FilterConstants.productIds) {
    filter = getProductIds({ deleteFlag: false }, "id productId");
  } else {
    let categorization: any = filterCatalog(searchCriteria);
    aggregate = generateAggregateForSuggestions(categorization);
  }
  if (aggregate) {
    filter.aggregate = aggregate;
  }
  return filter;
}

function getFilterForWebList(
  filterCriteria: Object,
  aggregate: any,
  filterType?: string | undefined
): FilterBase {
  return {
    filter: filterCriteria,
    fields:
      filterType == FilterConstants.META_DATE
        ? FilterTypeEnum.FIELDS_GLOBAL_CATALOG_META
        : undefined,
    populate:
      filterType == FilterConstants.WITH_VARIANTS
        ? ([
          { path: "category", populate: "webMedia mobileMedia posMedia" },
          { path: "subCategory", populate: "webMedia mobileMedia posMedia" },
          { path: "classification" },
          { path: "variants" },
        ] as any)
        : FilterTypeEnum.POPULATE_GLOBAL_CATALOG_WEBLIST,
    aggregate: aggregate,
  };
}

function getProductIds(query: any, fields: string): FilterBase {
  return {
    filter: query,
    fields: fields,
  };
}

function getGlobalCatalogueListWithOnlyCategoryIds(): FilterBase {
  return {
    filter: { deleteFlag: false },
    fields: "",
    populate: FilterTypeEnum.POPULATE_GLOBAL_CATALOG_WEBLIST,
  };
}

function getFilterForDetails(filterCriteria: any): FilterBase {
  return {
    filter: { _id: filterCriteria._id, deleteFlag: false },
    populate: FilterTypeEnum.POPULATE_GLOBAL_CATALOG_DETAILS,
  };
}
function getFilteredProductIds(filterCriteria: any): FilterBase {
  return {
    filter: {
      productId: { $in: filterCriteria.productIds },
      // businessUnitId: filterCriteria?.businessUnitId,
      deleteFlag: false,
    },
    populate: FilterTypeEnum.POPULATE_GLOBAL_CATALOG_DETAILS,
  };
}

function fetchMetaData(filterCriteria: any): FilterBase {
  let { filter } = buildRequestObjectForGlobalCatalog(filterCriteria);
  return {
    filter: filter,
    fields: FilterTypeEnum.FIELDS_GLOBAL_CATALOG_META,
  };
}

function fetchDropDownData(filterCriteria: any): FilterBase {
  let { filter } = buildRequestObjectForGlobalCatalog(filterCriteria);
  return {
    filter: filter,
    fields: "id productId",
    populate: "",
    aggregate: "",
    sort: "",
    populateFields: "",
  };
}

function buildRequestObjectForGlobalCatalog(
  serialized: any,
  page?: number,
  pageSize?: number,
  filterType?: string
): FilterBase {
  let shouldSearchValues = checkForSearchCriteria(serialized);
  let catalogObject: any;
  let aggregate: any;
  if (shouldSearchValues === true) {
    aggregate = getAggregateQueryForBulkSearchCriteria(
      serialized,
      page,
      pageSize,
      filterType
    );
  } else {
    catalogObject = getObjectForFilterQuery(
      serialized,
      filterCriteriaForGlobalCatalog
    );
    catalogObject.deleteFlag = false;
  }
  return {
    filter: catalogObject || {},
    aggregate: aggregate || undefined,
  };
}

export function checkForSearchCriteria(catalogFilter: any) {
  let categoryNames = isValidArray(catalogFilter, "categoryNames");
  let subCategoryNames = isValidArray(catalogFilter, "subCategoryNames");
  let classificationNames = isValidArray(catalogFilter, "classificationNames");
  if (categoryNames || subCategoryNames || classificationNames) {
    return true;
  } else {
    return false;
  }
}

function filterCatalog(catalogFilter: any) {
  let categoryName = isValidArray(catalogFilter, "categoryName");
  let subCategoryName = isValidArray(catalogFilter, "subCategoryName");
  let classificationName = isValidArray(catalogFilter, "classificationName");

  if (categoryName) {
    return {
      field: FilterConstants.CATEGORY_NAME,
      value: categoryName,
      search: true,
    };
  } else if (subCategoryName) {
    return {
      field: FilterConstants.SUB_CATEGORY_NAME,
      value: subCategoryName,
      search: true,
    };
  } else if (classificationName) {
    return {
      field: FilterConstants.CLASSIFICATION_NAME,
      value: classificationName,
      search: true,
    };
  }
}

function getAggregateQueryForBulkSearchCriteria(
  catalogFilter: any,
  page?: number,
  pageSize?: number,
  filterType?: string
) {
  let categoryNames = isValidArray(catalogFilter, "categoryNames");
  let subCategoryNames = isValidArray(catalogFilter, "subCategoryNames");
  let classificationNames = isValidArray(catalogFilter, "classificationNames");

  const filterCriteria: FilterCriteria[] = [
    {
      field: "category",
      values: categoryNames || [],
      collectionName: FilterConstants.CATEGORY,
      propertyName: FilterConstants.CATEGORY_NAME,
    },
    {
      field: "subCategory",
      values: subCategoryNames || [],
      collectionName: FilterConstants.SUB_CATEGORY,
      propertyName: FilterConstants.SUB_CATEGORY_NAME,
    },
    {
      field: "classification",
      values: classificationNames || [],
      collectionName: FilterConstants.CLASSIFICATION,
      propertyName: FilterConstants.CLASSIFICATION_NAME,
    },
  ];

  return generateAggregationForSearchCriteria(
    catalogFilter,
    filterCriteria,
    page,
    pageSize,
    filterType
  );
}

function generateAggregateForSuggestions(catalogObject: any) {
  const collectionMap: any = {
    categoryName: { field: "category", collection: FilterConstants.CATEGORY },
    subCategoryName: {
      field: "subCategory",
      collection: FilterConstants.SUB_CATEGORY,
    },
    classificationName: {
      field: "classification",
      collection: FilterConstants.CLASSIFICATION,
    },
  };

  const fieldToMatch: any = collectionMap[catalogObject?.field];
  if (!fieldToMatch) {
    throw new Error("Invalid field specified in catalogObject.");
  }
  const aggregationPipeline: any = [
    {
      $lookup: {
        from: fieldToMatch?.collection,
        localField: fieldToMatch?.field,
        foreignField: FilterConstants.FOREIGN_ID,
        as: fieldToMatch?.field,
      },
    },
  ];
  aggregationPipeline.push({
    $match: { deleteFlag: false },
  });
  let matchCondition = catalogObject?.search
    ? {
      $match: {
        [`${fieldToMatch?.field}.${catalogObject.field}`]: {
          $regex: new RegExp(catalogObject.value, "i"),
        },
      },
    }
    : undefined;
  aggregationPipeline.push(matchCondition);

  aggregationPipeline.push({
    $project: {
      _id: 1,
      [`${fieldToMatch?.field}.${FilterConstants.FOREIGN_ID}`]: 1,
      [`${fieldToMatch?.field}.${catalogObject?.field}`]: 1,
    },
  });

  aggregationPipeline.push({
    $group: {
      _id: {
        category: `$${fieldToMatch?.field}.${catalogObject?.field}`,
        date: "$date",
        project: "$project",
      },
      doc: { $first: "$$ROOT" },
    },
  });

  aggregationPipeline.push({
    $replaceRoot: {
      newRoot: "$doc",
    },
  });
  return aggregationPipeline;
}

interface FilterCriteria {
  field: string;
  values: string[] | undefined;
  collectionName: string;
  propertyName: string;
  productIds?: string[] | undefined;
}

function generateAggregationForSearchCriteria(
  catalogFilter: any,
  filterCriteria: FilterCriteria[],
  page?: number,
  pageSize?: number,
  filterType?: string
): any[] {
  let productIds = catalogFilter?.productIds
    ? catalogFilter.productIds
    : undefined;

  const aggregationPipeline: any[] = [];
  filterCriteria.forEach((filterCriteria) => {
    const { field, values, collectionName, propertyName } = filterCriteria;
    aggregationPipeline.push(
      createLookupPipeline(
        field,
        FilterConstants.FOREIGN_ID,
        field,
        collectionName
      )
    );

    if (values && values.length > 0) {
      const orConditions: any[] = values.map((value) =>
        createRegexCondition(field, value, propertyName)
      );
      const andCondition: any = { $and: [{ $or: orConditions }] };
      aggregationPipeline.push({ $match: andCondition });
    }
  });

  if (productIds) {
    aggregationPipeline.push({
      $addFields: {
        // entityInternalId: { $toString: "$entityInternalId" },
        productId: { $toString: "$productId" },
      },
    });
    let productIdMatch = {
      deleteFlag: false,
      productId: { $in: productIds?.map((item: any) => String(item)) },
    };
    aggregationPipeline.push({ $match: productIdMatch });
  }

  if (page && pageSize) {
    const skipStage: any = { $skip: (page - 1) * pageSize };
    const limitStage: any = { $limit: pageSize };
    aggregationPipeline.push(skipStage, limitStage);
  }
  if (filterType === FilterConstants.PAGINATION) {
    aggregationPipeline.push({
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    });
  }
  return aggregationPipeline;
}

function createRegexCondition(
  field: string,
  value: string,
  propertyName: string
): any {
  return {
    [`${field}.${propertyName}`]: {
      $regex: new RegExp(`${value}`, "i"),
    },
  };
}

function createLookupPipeline(
  localField: string,
  foreignField: string,
  as: string,
  collectionName: string
): any {
  return {
    $lookup: {
      from: collectionName,
      localField,
      foreignField,
      as,
    },
  };
}
