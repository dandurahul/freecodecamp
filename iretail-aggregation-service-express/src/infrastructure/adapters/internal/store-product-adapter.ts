import { SERVICE_URL } from "../../../config/config";
import { IStoreProductHistoryAdapter } from "../../contracts/i-store-product-history";
import AdapterBase from "./adapter-base";

export class StoreProductHistoryAdapter
  extends AdapterBase
  implements IStoreProductHistoryAdapter
{
  async getStoreProductHistoryList(
    data: any,
    page: any,
    pageSize: number,
    filterType: any
  ): Promise<any> {
    try {
      const url =
        `${SERVICE_URL.IRETAIL_SERVICE_URL}/catalog-price-history/filter/products?page=` +
        page +
        `&pageSize=` +
        pageSize +
        `&filterType=` +
        filterType;
      return this.postRequest(url, data);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async createStoreProductHistoryBulk(data: any): Promise<any> {
    try {
      const url = `${SERVICE_URL.IRETAIL_SERVICE_URL}/`;
      return this.postRequest(url, data);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
}
