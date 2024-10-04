import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { filterCriteriaForSubCategory } from "../../constants/filter-criteria.constants";
import FilterTypeEnum, {
  filterConditionsForSubCategory,
} from "../../enums/filter.enum";
import { FilterBase } from "../entities/filter/filter.base";

export function buildFilterObjectForSubCategory(
  filterType: string,
  filterCriteria: Object
) {
  return getFilterByFilterType(filterType, filterCriteria);
}

function getFilterByFilterType(
  filterType: string,
  filterCriteria: Object | undefined
): FilterBase | undefined {
  switch (filterType) {
    case FilterTypeEnum.DROPDOWN: {
      return getFilterForDropdown(filterCriteria);
    }
    case FilterTypeEnum.SEARCH_BY_KEY: {
      return getFilterForSearchByKey(filterCriteria);
    }
    case FilterTypeEnum.WEBLIST_WITH_COUNT: {
      return getFilterForWebList(filterCriteria);
    }
    case FilterTypeEnum.DETAILS_WITH_PRODUCT_ALLOWED: {
      return getFilterwithProductAllowed(filterCriteria);
    }
    case FilterTypeEnum.BULK_DATA: {
      return getFilterForBulkData(filterCriteria);
    }
    default: {
      return buildRequestObjectForSubCategory(filterCriteria);
    }
  }
}
function getFilterForDropdown(filterCriteria: any): FilterBase {
  return {
    filter: { deleteFlag: false, ...filterCriteria },
    fields: "_id subCategoryName",
    populate: undefined,
    aggregate: undefined,
    sort: undefined,
    populateFields: undefined,
  };
}

function getFilterForBulkData(filterCriteria: any): FilterBase {
  filterCriteria?.map((data: any) => {
    return {
      deleteFlag: false,
      ...data,
    };
  });
  return {
    filter: { $or: filterCriteria },
    fields: "_id subCategoryName orderValue categoryId businessUnitId",
    populate: undefined,
    aggregate: undefined,
    sort: undefined,
    populateFields: undefined,
  };
}

function getFilterwithProductAllowed(filterCriteria: any): FilterBase {
  return {
    filter: {
      deleteFlag: false,
      activeFlag: true,
      businessUnitId: filterCriteria.businessUnitId,
    },
    fields: FilterTypeEnum.FIELDS_SUBCATEGORY_PRODUCT_ALLOWED,
  };
}

function getFilterForSearchByKey(filterCriteria: any | undefined): FilterBase {
  let searchKey: any = filterCriteria?.searchKey
    ? filterCriteria.searchKey
    : "";
  return {
    filter: {
      subCategoryName: { $regex: searchKey, $options: "i" },
      businessUnitId: filterCriteria.businessUnitId,
      deleteFlag: false,
      activeFlag: true,
    },
    fields: FilterTypeEnum.FIELDS_SUBCATEGORY_PRODUCT_ALLOWED,
    populate: FilterTypeEnum.POPULATE_SUBCATEGORY_SEARCH_KEY,
  };
}

function getFilterForWebList(serialized: any): FilterBase {
  let subCategoryObject: any = getObjectForFilterQuery(
    serialized,
    filterConditionsForSubCategory
  );
  subCategoryObject.deleteFlag = false;
  return {
    filter: subCategoryObject,
    fields: "",
    populate: FilterTypeEnum.POPULATE_SUB_CATEGORY_WEBLIST,
    sort: "subCategoryName",
  };
}

export const buildRequestObjectForSubCategory = (serialized: any) => {
  let subCategoryObject: any = getObjectForFilterQuery(
    serialized,
    filterCriteriaForSubCategory
  );
  subCategoryObject.deleteFlag = false;
  return {
    filter: subCategoryObject,
    fields: "",
    populate: FilterTypeEnum.POPULATE_SUB_CATEGORY_WEBLIST,
    sort: "orderValue",
  };
};
