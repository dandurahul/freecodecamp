import { injectable } from "inversify";
import AdapterBase from "./adapter-base";
import { IOrderAdapter } from "../../contracts/i-order-adapter";
import { SERVICE_URL } from "../../../config/config";

@injectable()
export class OrderAdapter extends AdapterBase implements IOrderAdapter {
  async getInvoiceById(id: any): Promise<any> {
    try {
      const url = `${SERVICE_URL}/${id}`;
      return this.fetchData(url);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
}
