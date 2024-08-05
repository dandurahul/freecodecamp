import { inject, injectable } from "inversify";
import { ContainerTypes } from "../bindings/container-types";
import { successResponse } from "../models/response.model";
import { IiretailController } from "../contracts/i-retail-controller";
import { Request, Response } from "express";
import { IIRetailAggregationService } from "../../application/contracts/i-iretail-aggragation.service";

@injectable()
export class IretailController implements IiretailController {
  @inject(ContainerTypes.IretailAggregationService)
  private iretailAggregationService!: IIRetailAggregationService;

  async BarCodeSync(request: Request, response: Response): Promise<any> {    
    const result = await this.iretailAggregationService.BarCodeSync("");
    response.json(successResponse(result));
  }
  async StockCodeSync(request: Request, response: Response): Promise<any> {
    let stockCodeSync: any = request.body;
    const result = await this.iretailAggregationService.StockStatusSync(
      stockCodeSync
    );
    response.json(successResponse(result));
  }
  async productPriceSync(request: Request, response: Response): Promise<any> {
    let productPriceSync: any = request.body;
    const result = await this.iretailAggregationService.ProductPriceSync(
      productPriceSync
    );
    response.json(successResponse(result));
  }
}
