import moment from "moment-timezone";
import { constants } from "../../api/constants/constants.constants";
import { commonErrorResponse } from "../../api/models/common-error.response.model";
import errorMessages from "../constants/error-messages";
import { injectable } from "inversify";
import { FilterConstants } from "../constants/filter.constants";
import jwt from "jsonwebtoken";
@injectable()
class CommonUtils {
  removeUndefinedInArray(data: string[]) {
    let result = [];
    data &&
      data.map((element) => {
        if (
          element != undefined ||
          element != "undefined" ||
          element != null ||
          element != "null"
        )
          result.push(element);
      });
    data = data && data.filter((item) => !!item);
    return data;
  }

  deepEqual(obj1: any, obj2: any) {
    if (obj1 === obj2) {
      return true;
    }
    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }

  filterFunc(filter: any, common: any) {
    return filter && filter[common] && filter[common].length > 0
      ? filter[common]
      : undefined;
  }

  removeUndefinedInArrayOfObject(data: any) {
    return data?.filter((item: any) => !!item);
  }

  convertUtcDateToLocal(
    date: any,
    timeZone: string | undefined,
    format: string | undefined
  ) {
    const result =
      date && timeZone
        ? format
          ? moment.tz(date, timeZone).format(format)
          : moment.tz(date, timeZone).format(constants.DEFAULT_FORMAT)
        : date;
    return result;
  }

  public getFilterByAction(action: string | undefined): Object {
    let result;
    switch (action) {
      case FilterConstants.ACTIVE: {
        try {
          result = {
            activeFlag: true,
            modifiedDate: new Date(),
          };
        } catch (err: any) {
          throw err;
        }
        break;
      }
      case FilterConstants.INACTIVE: {
        try {
          result = {
            activeFlag: false,
            modifiedDate: new Date(),
          };
        } catch (err: any) {
          throw err;
        }
        break;
      }
      case FilterConstants.DELETE: {
        try {
          result = {
            deleteFlag: true,
            modifiedDate: new Date(),
          };
        } catch (err: any) {
          throw err;
        }
        break;
      }
      default: {
        try {
          result = {};
        } catch (err: any) {
          throw err;
        }
      }
    }
    return result;
  }

  commonFilterForList(list: any, commonValue: string, value: string) {
    return list?.find((item: any) => {
      return item ? item[value] === commonValue : undefined;
    });
  }

  customPagination(productList: any, page_size: number, page_number: number) {
    return productList.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
  }

  throwErrorMessage(message: any) {
    return Object.assign({
      message: message,
    });
  }

  removeNullFromObject(object: any) {
    for (const key in object) {
      if (
        object[key] == null ||
        object[key] === undefined ||
        object[key] === "" ||
        object[key] === "N/A"
      ) {
        delete object[key];
      }
    }
    return object;
  }

  leadingZero(num: number, totalLength: number) {
    return String(num).padStart(totalLength, "0");
  }

  extractProperties = (obj: any, propertiesToExtract: any) => {
    return propertiesToExtract.reduce((extractedObject: any, prop: any) => {
      extractedObject[prop] = obj[prop];
      return extractedObject;
    }, {});
  };

  parameterizedString = (...args: any) => {
    const str = args[0];
    const params = args.filter((arg: string, index: number) => index !== 0);
    if (!str) return "";
    return str.replace(/%s[0-9]+/g, (matchedStr: string) => {
      const variableIndex = parseInt(matchedStr.replace("%s", "0")) - 1;
      return params[variableIndex];
    });
  };

  convertDateForCompare(date: any) {
    let a: any = moment({
      h: date.split(":")[0],
      m: date.split(":")[1],
    });
    return a;
  }
}
export function headerForIretail(
  merchantcode: any,
  startTime: any,
  batchNumber: any,
  batchSize: any,
  auth: any,
  erpStoreCode: any
) {
  let headers: any = {};
  if (merchantcode) {
    headers.merchantcode = merchantcode;
  }
  if (startTime) {
    headers.startTime = startTime;
  }
  if (batchNumber || batchNumber === 0) {
    headers.batchNumber = batchNumber;
  }
  if (batchSize) {
    headers.batchSize = batchSize;
  }
  if (auth) {
    headers.authorization = "Bearer " + auth;
  }
  if (erpStoreCode) {
    headers[constants.STORE_ERP_CODE] = erpStoreCode;
  }
  return headers;
}

export function dataSegiragator(globalProduct: any, iretailData: any) {
  const storeProducts = globalProduct.data.map((d: any) => {
    let globalProductItemCodes = d && d.itemCode;
    let iretailMaster =
      iretailData &&
      iretailData.filter(
        (c: any) => c[constants.PRODUCT_CODE] === globalProductItemCodes
      );
    // console.log({iretailMaster});

    // return iretailMaster;
  });

  // return removeUndefinedInArrays();
}

// function removeUndefinedInArrays(data:any) {

// }
export default new CommonUtils();
