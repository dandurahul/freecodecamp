import { inject, injectable } from "inversify";
import { ISalesInvoiceAggregationService } from "../contracts/i-sales-invoice-aggregation.service";
import { ContainerTypes } from "../../api/bindings/container-types";
import { ISalesInvoiceAdapter } from "../../infrastructure/contracts/sales-invoice-adapter";
import { IAdminAdapter } from "../../infrastructure/contracts/i-admin-adapter";
import { IAdminAggregationService } from "../contracts/i-admin-aggregation.service";
import { constants } from "buffer";
import constant from "../constants/constant";
import { IOrderAdapter } from "../../infrastructure/contracts/i-order-adapter";
import { IStoreMappingData } from "../../infrastructure/contracts/i-store-mapping";
import { ICommonService } from "../contracts/i-common-service";

@injectable()
export class SalesInvoiceAggregationService
  implements ISalesInvoiceAggregationService
{
  @inject(ContainerTypes.SalesInvoiceAdapter)
  private salesInvoiceAdapter!: ISalesInvoiceAdapter;
  @inject(ContainerTypes.AdminAggregationService)
  private adminAggregationService!: IAdminAggregationService;
  @inject(ContainerTypes.OrderAdapter)
  private orderAdapter!: IOrderAdapter;
  @inject(ContainerTypes.storeAdapter)
  private storeAdapter!: IStoreMappingData;
  // @inject(ContainerTypes.CommonService)
  // private commonService!: ICommonService;
  async postSalesInvoice(
    requestObject: any,
    filterType: any,
    fetchType: any
  ): Promise<any> {
    let invoice;
    try {
      let invoiceDetails;
      let invoiceId;
      let invoiceObject;
      let syncAll = requestObject && requestObject.syncAll;
      let defaultCustomer =
        requestObject && requestObject.defaultCustomer
          ? requestObject.defaultCustomer
          : false;
      let currencyDecimals = await this.adminAggregationService.getCurrency();
      if (filterType === constant.SYNC_INVOICE) {
        invoiceId = requestObject && requestObject.invoiceId;
        if (invoiceId) {
          invoiceObject = await this.orderAdapter.getInvoiceById(invoiceId);
          let storeMappingData = await this.storeAdapter.getStoreMappingData(
            "STORE_MAPPING"
          );
          let entityInternalId =
            invoiceObject && invoiceObject.entityInternalId;
          let orderProduct =
            invoiceObject &&
            invoiceObject.orderProduct &&
            invoiceObject.orderProduct.length > 0
              ? invoiceObject.orderProduct
              : [];
          // let { storeProductList, unitList, globalProductList } =
          //   await this.commonService.getRequiredDataForQuantity(
          //     entityInternalId,
          //     orderProduct
          //   );
        }
      }
    } catch (error) {}
    return await this.salesInvoiceAdapter.postSalesInvoice(
      requestObject,
      filterType,
      fetchType
    );
  }
}
