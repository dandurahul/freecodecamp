export interface IOrderAdapter {
  getInvoiceById(data: any): Promise<any>;
}
