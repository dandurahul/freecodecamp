import { injectable } from "inversify";
import "reflect-metadata";
import { jsonFetch } from "./json-fetch";

@injectable()
class AdapterBase {
  async postRequest(url: string, requestValue: Object) {
    try {
      return await jsonFetch({
        url: url,
        method: "post",
        data: requestValue,
      });
    } catch (err: any) {
      throw Object.assign(err);
    }
  }

  async fetchData(url: string, headers?: any) {
    try {
      return await jsonFetch({
        url: url,
        method: "get",
        headers,
      });
    } catch (err: any) {
      throw Object.assign(err);
    }
  }
  async updateAction(url: string) {
    try {
      return await jsonFetch({
        url: url,
        method: "put",
      });
    } catch (err: any) {
      throw Object.assign(err);
    }
  }

  async updateData(url: string, requestValue: Object) {
    try {
      return await jsonFetch({
        url: url,
        method: "put",
        data: requestValue,
      });
    } catch (err: any) {
      throw Object.assign(err);
    }
  }

  async deleteData(url: string, requestValue?: Object) {
    try {
      return await jsonFetch({
        url: url,
        method: "delete",
        data: requestValue || {},
      });
    } catch (err: any) {
      throw Object.assign(err);
    }
  }
}

export default AdapterBase;
