export interface ISalesInvoiceAggregationService {
  postSalesInvoice(reqData: any, filterType: any, fetchType: any): Promise<any>;
}
