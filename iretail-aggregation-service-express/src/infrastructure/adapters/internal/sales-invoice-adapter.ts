import { injectable } from "inversify";
import { ISalesInvoiceAdapter } from "../../contracts/sales-invoice-adapter";
import AdapterBase from "./adapter-base";
import { SERVICE_URL } from "../../../config/config";

@injectable()
export class SalesInvoiceAdapter
  extends AdapterBase
  implements ISalesInvoiceAdapter
{
  async postSalesInvoice(
    reqData: any,
    filterType: any,
    fetchType: any
  ): Promise<any> {
    try {
      const url = `${SERVICE_URL}/`;
      return this.postRequest(url, reqData);
    } catch (error: unknown) {
      throw error instanceof Error ? Object.assign(error) : error;
    }
  }
}
