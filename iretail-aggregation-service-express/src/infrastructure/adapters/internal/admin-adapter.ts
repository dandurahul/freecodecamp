import { injectable } from "inversify";
import { IAdminAdapter } from "../../contracts/i-admin-adapter";
import AdapterBase from "./adapter-base";
import { SERVICE_URL } from "../../../config/config";

@injectable()
export class AdminAdapter extends AdapterBase implements IAdminAdapter {
  async getGlobalSettings(): Promise<any> {
    try {
      const url = `${SERVICE_URL}/`;
      return this.fetchData(url);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
  async getAllCurrenciesByID(): Promise<any> {
    try {
      const url = `${SERVICE_URL}/`;
      return this.fetchData(url);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
}
