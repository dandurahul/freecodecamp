import { inject, injectable } from "inversify";
import { ISalesInvoiceController } from "../contracts/i-sales-invoice-controller";
import { ContainerTypes } from "../bindings/container-types";
import { Request, Response } from "express";
import { ISalesInvoiceAggregationService } from "../../application/contracts/i-sales-invoice-aggregation.service";
import { successResponse } from "../models/response.model";

@injectable()
export class SalesInvoiceController implements ISalesInvoiceController {
  @inject(ContainerTypes.SalesInvoiceAggregationService)
  private salesAggregationService!: ISalesInvoiceAggregationService;
  async postSalesInvoice(request: Request, response: Response): Promise<any> {
    let result;
    const reqData = request.body;
    const filterType = request.query.filterType || "";
    const fetchType = request.query.fetchType || "";

    let results = await this.salesAggregationService.postSalesInvoice(
      reqData,
      filterType,
      fetchType
    );
    response.json(successResponse(results));
  }
}
