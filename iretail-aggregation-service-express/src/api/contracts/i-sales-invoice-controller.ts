import { Request, Response } from "express";
export interface ISalesInvoiceController {
  postSalesInvoice(request: Request, response: Response): Promise<any>;
}
