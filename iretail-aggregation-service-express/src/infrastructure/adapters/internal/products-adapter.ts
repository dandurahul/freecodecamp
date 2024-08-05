import { SERVICE_URL } from "../../../config/config";
import { IProductAdapter } from "../../contracts/i-product-adapter";
import AdapterBase from "./adapter-base";

export class ProductsAdapter extends AdapterBase implements IProductAdapter {
  async getAllUnits(filterType: any): Promise<any> {
    try {
      const url = `${SERVICE_URL}/units?filterType=` + filterType;
      return this.fetchData(url);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async getAllProductsByIds(productIds: any, filterType: any): Promise<any> {
    try {
      const url = `${SERVICE_URL.PRODUCT_SERVICE_URL}/variants/filter`;
      return this.postRequest(url, filterType);
    } catch (error) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async updateProductWithBarcodes(data: any): Promise<any> {
    try {
      const url = `${SERVICE_URL.PRODUCT_SERVICE_URL}/variants/update-many`;
      return this.postRequest(url, data);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async getProductsByProductCode(data: any, filterType: any): Promise<any> {
    try {
      const url =
        `${SERVICE_URL.PRODUCT_SERVICE_URL}/products/products?filterType=` +
        filterType;
      return this.postRequest(url, data);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
}
