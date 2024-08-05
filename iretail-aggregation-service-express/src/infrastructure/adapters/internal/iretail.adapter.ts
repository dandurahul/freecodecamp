import { injectable } from "inversify";
import AdapterBase from "./adapter-base";
import { IRetailAdapter } from "../../contracts/iretail-adapter";
import { SERVICE_URL } from "../../../config/config";

@injectable()
class IretailAdapter extends AdapterBase implements IRetailAdapter {
  async BarCodeSync(data: any): Promise<any> {
    try {
      const url = `${SERVICE_URL}/`;
      return this.postRequest(url, data);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async StockCodeSync(data: any): Promise<any> {
    try {
      const url = `${SERVICE_URL}/`;
      return this.postRequest(url, data);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async ProductPriceSync(data: any): Promise<any> {
    try {
      const url = `${SERVICE_URL}/`;
      return this.postRequest(url, data);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async generateToken(headerWithOutToken: any): Promise<any> {
    try {
      const url = `http://omniprd.rdpwh.in:8289/Api/iretailoms/getToken`;
      let res = await this.fetchData(url);
      return res;
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async getBarCodeProducts(headerWithToken: any): Promise<any> {

    try {
      const url = `http://omniprd.rdpwh.in:8289/Api/iretailoms/getProductBarcode`;
    let Raldandu= await this.fetchData(url, headerWithToken);
    return Raldandu
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async getStockStatus(headerWithToken: any): Promise<any> {
    try {
      const url = `${process.env.IRETAIL_BASE_SERVICE_URL}/iretailoms/`;
      return this.fetchData(url);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async getProductPrice(headerWithToken: any): Promise<any> {
    try {
      const url = `${process.env.IRETAIL_BASE_SERVICE_URL}/iretailoms/getProductPrices`;
      return this.fetchData(url);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
}
export default IretailAdapter;
