import CategoryController from "../../../api/controllers/categories/category.controller";
import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { CategoryFilterModel } from "../../../domain/models/catagories/filter/category-filter.model";
import { filterCriteriaForCategory } from "../../constants/filter-criteria.constants";
import FilterTypeEnum, {
  filterConditionsForCategory,
} from "../../enums/filter.enum";
import { FilterBase } from "../entities/filter/filter.base";

export function buildFilterObjectForCategory(
  filterCriteria: Object | undefined,
  filterType: string | undefined,
  fetchType: string | undefined
) {
  if (fetchType === FilterTypeEnum.PRODUCT_NOT_ALLOWED_DROPDOWN) {
    return getFilterForProductNotAllowedDropdown(filterCriteria);
  }
  return getFilterByFilterType(filterType, filterCriteria);
}

function getFilterByFilterType(
  filterType: string | undefined,
  filterCriteria: Object | undefined
): FilterBase | undefined {
  switch (filterType) {
    case FilterTypeEnum.DROPDOWN: {
      return getFilterForDropdown(filterCriteria);
    }
    case FilterTypeEnum.WEBLIST_WITH_COUNT: {
      return getFilterForWebList(filterCriteria);
    }
    case FilterTypeEnum.PRODUCT_NOT_ALLOWED_DROPDOWN: {
      return getFilterForProductNotAllowedDropdown(filterCriteria);
    }
    case FilterTypeEnum.DETAILS_WITH_PRODUCT_ALLOWED: {
      return getFilterwithProductAllowed(filterCriteria);
    }
    case FilterTypeEnum.SEARCH_BY_KEY: {
      return getFilterForSearchByKey(filterCriteria);
    }
    case FilterTypeEnum.BULK_DATA: {
      return getFilterForBulkData(filterCriteria);
    }
    default: {
      return buildRequestObjectForCategory(filterCriteria);
    }
  }
}
function getFilterForDropdown(filterCriteria: any): FilterBase {
  return {
    filter: { deleteFlag: false, ...filterCriteria },
    fields: "_id categoryName",
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
    fields: "_id categoryName orderValue",
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
      businessUnitId: filterCriteria?.businessUnitId,
    },
    fields: FilterTypeEnum.FIELDS_CATEGORY_PRODUCT_ALLOWED,
  };
}

function getFilterForSearchByKey(filterCriteria: any | undefined): FilterBase {
  let searchKey: any =
    filterCriteria && filterCriteria?.searchKey ? filterCriteria.searchKey : "";
  let businessUnitId: string | undefined = filterCriteria?.businessUnitId
    ? filterCriteria.businessUnitId
    : undefined;
  return {
    filter: {
      categoryName: { $regex: searchKey, $options: "i" },
      businessUnitId: businessUnitId,
      deleteFlag: false,
      activeFlag: true,
    },
    fields: FilterTypeEnum.FIELDS_CATEGORY_PRODUCT_ALLOWED,
  };
}

function getFilterForProductNotAllowedDropdown(serialized: any): FilterBase {
  let categoryObject: any = getObjectForFilterQuery(
    serialized,
    filterConditionsForCategory
  );
  categoryObject.activeFlag = true;
  categoryObject.productAllowed = false;
  categoryObject.deleteFlag = false;
  return {
    filter: categoryObject,
    fields: "_id categoryName productAllowed orderValue",
    populate: undefined,
    aggregate: undefined,
    sort: undefined,
    populateFields: undefined,
  };
}

function getFilterForWebList(serialized: any): FilterBase {
  let categoryObject: any = getObjectForFilterQuery(
    serialized,
    filterConditionsForCategory
  );
  categoryObject.deleteFlag = false;
  return {
    filter: categoryObject,
    fields: "",
    populate: "webMedia mobileMedia posMedia seo",
    sort: "categoryName",
  };
}

function buildRequestObjectForCategory(serialized: any): FilterBase {
  let categoryObject: any = getObjectForFilterQuery(
    serialized,
    filterCriteriaForCategory
  );
  categoryObject.deleteFlag = false;
  return {
    filter: categoryObject,
    fields: "",
    populate: "webMedia mobileMedia posMedia seo",
    sort: "orderValue",
  };
}
