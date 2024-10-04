import { FilterConstants } from "../../../application/constants/filter.constants";
import { getObjectForFilterQuery } from "../../../application/utils/filter-functions";
import { filterCriteriaForClassification } from "../../constants/filter-criteria.constants";
import FilterTypeEnum, { filterConditionsForClassification } from "../../enums/filter.enum";
import { FilterBase } from "../entities/filter/filter.base";

export function buildFilterObjectForClassification(filterType: string, filterCriteria: Object) {
 return getFilterByFilterType(filterType, filterCriteria)
  };

function getFilterByFilterType(
  filterType: string | undefined,
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
      return getFilterwithProductAllowed();
    }
    default: {
      return buildRequestObjectForClassification(filterCriteria);
    }
  }
}

function getFilterForDropdown(filterCriteria: any): FilterBase {
  return {
    filter: { deleteFlag: false, ...filterCriteria },
    fields: FilterTypeEnum.FIELDS_CLASSIFICATION_DROPDOWN
  };
}

function getFilterwithProductAllowed(): FilterBase {
  return {
    filter: { deleteFlag: false, activeFlag: true },
    fields: FilterTypeEnum.FIELDS_CLASSIFICATION_PRODUCT_ALLOWED,
  };
}

function getFilterForSearchByKey(filterCriteria: any | undefined): FilterBase {
  let searchKey: any = filterCriteria?.searchKey
    ? filterCriteria.searchKey
    : "";

  return {
    filter: {
      classificationName: { $regex: searchKey, $options: "i" },
      deleteFlag: false,
      activeFlag: true,
    },
    fields: FilterTypeEnum.FIELDS_CLASSIFICATION_PRODUCT_ALLOWED,
    populate: FilterTypeEnum.POPULATE_CLASSIFICATION_SEARCH_KEY
  };
}

export function getFilterForWebList(serialized: any): FilterBase {
  let classificationObject: any = getObjectForFilterQuery(
    serialized,
    filterConditionsForClassification
  );
  classificationObject.deleteFlag = false;
  return {
    filter: classificationObject,
    fields: "",
    populate: FilterTypeEnum.POPULATE_CLASSIFICATION_WEB,
  };
}

function buildRequestObjectForClassification(serialized: any): FilterBase {
  let classificationObject: any = getObjectForFilterQuery(
    serialized,
    filterCriteriaForClassification
  );
  classificationObject.deleteFlag = false;
  return {
    filter: classificationObject,
    populate: FilterTypeEnum.POPULATE_CLASSIFICATION_DATA,
    sort: "orderValue",
  };
}
