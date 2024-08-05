export interface ISalesInvoiceAdapter {
  postSalesInvoice(reqData: any, filterType: any, fetchType: any): Promise<any>;
}
