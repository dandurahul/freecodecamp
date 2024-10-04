import { FilterConstants } from "../../../application/constants/filter.constants";
import {
  getObjectForFilterQuery,
  isValidArray,
} from "../../../application/utils/filter-functions";
import { filterCriteriaForExtendedGlobalCatalog } from "../../constants/filter-criteria.constants";
import FilterTypeEnum from "../../enums/filter.enum";
import { FilterBase } from "../entities/filter/filter.base";

export function buildFilterObjectForExtendedGlobalCatalogues(
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
    [FilterConstants.FOR_EXTENDED_CATALOGUE]: (filterCriteria: any) =>
      filterForExtendedCatalogue(filterCriteria),
    default: (
      filterCriteria: Object,
      page: number,
      pageSize: number,
      filterType: string
    ) => {
      const { filter, aggregate } = buildRequestObjectForExtendedGlobalCatalog(
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

function getFilterForWebList(
  filterCriteria: Object,
  aggregate: any,
  filterType?: string | undefined
): FilterBase {
  return {
    filter: filterCriteria,
    fields:
      filterType === FilterConstants.METADATA
        ? FilterTypeEnum.FIELDS_EXTENDED_GLOBAL_CATALOG_META
        : filterType === FilterTypeEnum.PRODUCTIDS
        ? FilterTypeEnum.FIELDS_EXTENTED_PRODUCTIDS
        : "",
    populate:
      filterType === FilterConstants.METADATA ||
      filterType === FilterTypeEnum.PRODUCTIDS
        ? ""
        : FilterTypeEnum.POPULATE_EXTENDED_CATALOG,
    aggregate: aggregate,
  };
}

function filterForExtendedCatalogue(
  filterCriteria: Object,
  filterType?: string | undefined
): FilterBase {
  const {
    classificationIds,
    subCategoryIds,
    categoryIds,
    subCategoryId,
    classificationId,
    categoryId,
    productIds,
  } = fetchValuesFromRequest(filterCriteria);

  let extendedCatalogFilter = buildRequestForAdvancedFilter(
    subCategoryIds,
    classificationIds,
    classificationId,
    categoryIds,
    subCategoryId,
    productIds
  );
  let extendedCatalogObject = getObjectForFilterQuery(
    extendedCatalogFilter,
    filterCriteriaForExtendedGlobalCatalog
  );
  extendedCatalogObject.deleteFlag = false;

  return {
    filter: extendedCatalogObject,
    fields:
      filterType === FilterConstants.FOR_EXTENDED_CATALOGUE
        ? FilterTypeEnum.FIELDS_EXTENDED_GLOBAL_CATALOG_META
        : "",
    populate: FilterTypeEnum.POPULATE_EXTENDED_CATALOG,
    aggregate: undefined,
  };
}

export const fetchValuesFromRequest = (storeCatalogue: any) => {
  const classificationIds = isValidArray(
    storeCatalogue,
    FilterConstants.classificationIds
  );
  const subCategoryIds = isValidArray(
    storeCatalogue,
    FilterConstants.subCategoryIds
  );
  const categoryIds = isValidArray(storeCatalogue, FilterConstants.categoryIds);
  const productIds = isValidArray(storeCatalogue, FilterConstants.productIds);
  let [classificationId = ""] = classificationIds || [];
  let [subCategoryId = ""] = subCategoryIds || [];
  let [categoryId = ""] = categoryIds || [];
  return {
    classificationIds,
    subCategoryIds,
    categoryIds,
    subCategoryId,
    classificationId,
    productIds,
    categoryId,
  };
};

const buildRequestForAdvancedFilter = (
  subCategoryIds: any,
  classificationIds: any,
  classificationId: any,
  categoryIds: any,
  subCategoryId: any,
  productIds: any
) => {
  return {
    activeFlag: true,
    productId: productIds,
    ...(subCategoryIds?.length && classificationIds?.length
      ? {
          classificationId,
          secondaryCategory: categoryIds,
          secondarySubCategory: subCategoryIds,
        }
      : categoryIds?.length
      ? { subCategoryId, secondaryCategory: categoryIds }
      : {}),
  };
};

function buildRequestObjectForExtendedGlobalCatalog(
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
      filterCriteriaForExtendedGlobalCatalog
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
      field: "categoryId",
      values: categoryNames || [],
      collectionName: FilterConstants.CATEGORY,
      propertyName: FilterConstants.CATEGORY_NAME,
    },
    {
      field: "subCategoryId",
      values: subCategoryNames || [],
      collectionName: FilterConstants.SUB_CATEGORY,
      propertyName: FilterConstants.SUB_CATEGORY_NAME,
    },
    {
      field: "classificationId",
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

  aggregationPipeline.push(
    createLookupPipeline(
      "globalCatalogue",
      FilterConstants.FOREIGN_ID,
      "globalCatalogue",
      FilterConstants.GLOBAL_CATALOG
    ),
    {
      $unwind: "$globalCatalogue",
    },
    {
      $unwind: "$categoryId",
    },
    {
      $unwind: "$subCategoryId",
    },
    {
      $unwind: "$classificationId",
    }
  );

  if (productIds) {
    aggregationPipeline.push({
      $addFields: {
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
