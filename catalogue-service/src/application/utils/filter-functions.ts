import { ObjectId } from "mongodb";
import { FilterConstants } from "../constants/filter.constants";
import { Types } from "mongoose";

export const isValidArray = (filter: any, common: any) => {
  return filter && filter[common] && filter[common].length > 0
    ? filter[common]
    : undefined;
};

export const checkValue = (value: any) => {
  return value?.length > 0 ? value : undefined;
};

export const getObjectForFilterQuery = (
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
        let value = serialized[filterKey];
        if (
          value !== ignoreValue &&
          value !== FilterConstants.VALUE_UNDEFINED
        ) {
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

export const incrementLeadingZeroNumber = (
  leadingZeroString: any,
  amountToIncrement: any
) => {
  let amountOfZerosToAdd = leadingZeroString.length;
  let stringToNumber = +leadingZeroString;
  let newNumber = stringToNumber + amountToIncrement;
  let leadingZeroWithNumber = leadingZero(newNumber, amountOfZerosToAdd);
  return leadingZeroWithNumber;
};

export const leadingZero = (num: any, totalLength: any) => {
  return String(num).padStart(totalLength, "0");
};

export const getPriceStringByPrecedence = (
  value: any,
  currencyDecimals: any
) => {
  if (value || value == 0) {
    value = parseFloat(value);
    let valueData = typeof value === "string" ? value : JSON.stringify(value);
    return valueData ? value.toFixed(currencyDecimals) : value;
  }
};

export const conversionOfOrder = (value: number) => {
  let number = Math.round(value * 100) / 100;
  return parseFloat(number.toFixed(2)) || 0;
};

export const isNull = (value: any) => {
  return value === null;
};

export const objectIdArrayToStringArray = (objectIdArray: any) => {
  return objectIdArray.map((objectId: any) => objectId?.toString());
};

export const extractObjectIds = (array: any[], value: string) => {
  return array
    .map((object: any) => {
      const objectId = object?.[value];
      return objectId !== null && objectId !== undefined ? objectId : null;
    })
    .filter(
      (objectId: any) => objectId !== null && objectId !== undefined
    ) as string[];
};

export const countMatchingElements = (array1: any, array2: any) => {
  const set2 = new Set(array2);
  return array1.filter((element: any) => set2.has(element)).length;
};

export const getListByData = (data: any, value: any) => {
  return data && data[value] && data[value].length > 0 ? data[value] : [];
};

export const checkArray = (data: any) => {
  return data && data.length > 0 ? data : [];
};

export function removeUndefinedFromArray(arr: any[]): any[] {
  return arr?.filter((item) => item !== undefined);
}

export const validateArray = (data: any) => {
  return data.filter((element: any) => {
    if (typeof element === "object" && Object.keys(element).length === 0) {
      return false;
    }
    return true;
  });
};
export const customUrlTransformation = (value: any) => {
  return value?.replace(/\s+/g, "-").toLowerCase() || "";
};

export const getSeoUrl = (...objects: any) => {
  for (const obj of objects) {
    const seoUrl = obj?.seo?.url;
    if (seoUrl) {
      return seoUrl;
    }
  }
  return "";
};

export const getMatchingIds = (
  filteredCategoryIds: any[],
  allCategories: any[]
): any[] => {
  const matchedIds = [];
  const arr2String = JSON.stringify(allCategories);
  for (const element of filteredCategoryIds) {
    const elementString = JSON.stringify(element);
    if (arr2String.includes(elementString)) {
      matchedIds.push(element);
    }
  }
  return matchedIds;
};

export const filterNullOrUndefinedValues = <T>(selectQuery: T): Partial<T> => {
  const filteredQuery: Partial<T> = {};
  for (const key in selectQuery) {
    const value = selectQuery[key];
    if (
      value !== undefined &&
      value !== null &&
      !(["", "undefined"] as any).includes(value)
    ) {
      filteredQuery[key] = value;
    }
  }
  return filteredQuery;
};

export const filterNonNullValues = (arr: any) => {
  return arr?.filter((value: any) => value !== null && value !== "");
};

export const validateBoolean = (request: any, extendedCatalogFlag: string) => {
  const booleanValue = request.query[extendedCatalogFlag] as string;
  return booleanValue === "true";
};

export const updateFilteredIds = (
  existingIds: string[],
  data: any[] | undefined,
  filteredIds: string[]
): string[] => {
  const filteredData = data?.filter((item) => filteredIds.includes(item._id));
  const flattenedData: string[] =
    filteredData?.flatMap((item) =>
      (item?.secondaryCategory ?? item?.secondarySubCategory ?? []).map(String)
    ) ?? [];
  const uniqueValues = Array.from(new Set(flattenedData?.filter(Boolean)));
  return existingIds.concat(uniqueValues);
};

export const removeNonObjectIds = (data: any, fields: string[]): any => {
  const newData: Record<string, any> = {};
  for (const key in data) {
    if (
      Object.prototype.hasOwnProperty.call(data, key) &&
      fields.includes(key)
    ) {
      const value = data[key];
      if (Array.isArray(value)) {
        newData[key] = value.filter((id) => Types.ObjectId.isValid(id));
      } else {
        newData[key] = Types.ObjectId.isValid(value) ? value : undefined;
        if (newData[key] === undefined) {
          delete data[key];
          delete newData[key];
        }
      }
    } else {
      newData[key] = data[key];
    }
  }
  return newData;
};
