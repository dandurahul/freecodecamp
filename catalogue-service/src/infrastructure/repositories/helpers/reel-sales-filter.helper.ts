import { PaginationModel } from "../../../domain/models/pagination/pagination.model";
import { filterConditions } from "../../constants/filter-criteria.constants";
import { FilterBase } from "../entities/filter/filter.base";

export const buildRequestReelSales = (
  filterCriteria: any,
  filterType: any,
  pageSize: any,
  page: any,
  sort: any
) => {
  return buildRequestObjects(filterCriteria, filterType, pageSize, page, sort);
};
export const buildPaginationObject = (
  pageCount: number,
  pageSize: number
): PaginationModel => {
  return {
    pageSize: pageSize,
    pageCount: pageCount,
    noOfPages: pageSize ? pageCount / pageSize : 1,
  };
};

function buildRequestObjects(
  filterCriteria: any,
  filterType: any,
  pageSize: any,
  page: any,
  sort: any
): FilterBase {
  let filterObject = getObjectForAdminQuery(filterCriteria, filterConditions);
  filterObject.deleteFlag = false;
  filterObject.activeFlag = true;
  let aggregate=[{
    $lookup:{
      from:"Seo",
      localField:"Seo",
      foreignField:"_id",
      as :"data"
    }
  }]
  return {
    filter: filterObject,
    fields: "",
    populate: "seo",
    aggregate: aggregate,
    sort: sort,
    populateFields: undefined,
  };
}
export const getObjectForAdminQuery = (
  serialized: any,
  filterConditions: any
) => {
  const serializedKeys = Object.keys(serialized);
  let statusHistoryObject: any = {};
  filterConditions.forEach(
    ({
      filterKey,
      targetKey,
      isArray,
      operator,
      ignoreValue,
      isSearchKey,
      options,
    }: any) => {
      if (serializedKeys.includes(filterKey)) {
        const value = serialized[filterKey];
        if (value !== ignoreValue) {
          statusHistoryObject[targetKey] = isSearchKey
            ? { [operator]: value, [options]: "i" }
            : isArray
            ? { [operator]: value }
            : value;
        }
      }
    }
  );
  return statusHistoryObject;
};

export async function getFilterByAction(action: string, username?: string) {
  let result: any;

  try {
    switch (action) {
      case "ACTIVE":
        result = {
          activeFlag: true,
          modifiedBy: username || "",
          modifiedDate: new Date(),
        };
        break;

      case "INACTIVE":
        result = {
          activeFlag: false,
          modifiedBy: username || "",
          modifiedDate: new Date(),
        };
        break;

      case "DELETE":
        result = {
          deleteFlag: true,
          modifiedBy: username || "",
          modifiedDate: new Date(),
        };
        break;

      default:
        result = {};
        break;
    }
  } catch (err: any) {
    throw err;
  }

  return result;
}
