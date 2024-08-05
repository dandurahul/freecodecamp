import { SERVICE_URL } from "../../../config/config";
import { IStoreMappingData } from "../../contracts/i-store-mapping";
import AdapterBase from "./adapter-base";

export class StoreMappingAdapter
  extends AdapterBase
  implements IStoreMappingData
{
  async getStoreMappingData(filterType: any): Promise<any> {
    try {
      const url = `${SERVICE_URL}/stores/filter?filterType=${filterType}`;
      return this.postRequest(url, filterType);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
}
