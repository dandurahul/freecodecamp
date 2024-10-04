import { Request, Response, query } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { ICatalogueStockService } from "../../../application/contracts/catalogues/i-catalogue-stock.service";
import { CatalogueStockModel } from "../../../domain/models/catalogues/catalogue-stocks.model";
import { ICatalogueStockController } from "../../contracts/i-catalgue-stocks.controller";

@injectable()
export class CatalogueStockController implements ICatalogueStockController {
  @inject(ContainerTypes.CatalogueStockService)
  private catagoryService!: ICatalogueStockService;

  public async createCatalogueStocks(
    request: Request,
    response: Response
  ): Promise<void> {
    let model: CatalogueStockModel = request.body;
    const catagoryResponse = await this.catagoryService.createCatalogueStocks(
      model,
      request.query.filterType as string
    );
    response.json(successResponse(catagoryResponse));
  }

  async createOrUpdateCatalogueStock(
    request: Request,
    response: Response
  ): Promise<void> {
    response.send(
      successResponse(
        await this.catagoryService.createOrUpdateCatalogueStock(
          request.body.filter,
          request.body.stocks,
          request.query.filterType as string
        )
      )
    );
  }

  async getCatalogueStock(request: Request, response: Response): Promise<void> {
    response.json(
      successResponse(
        await this.catagoryService.getCatalogueStock(
          request.body,
          request.query.filterType as string
        )
      )
    );
  }

  async filterCatalogueStocks(
    request: Request,
    response: Response
  ): Promise<void> {
    const id: string = request.params.id;
    const categoryResponse = await this.catagoryService.filterCatalogueStocks(
      request.body,
      request.query.filterType as string,
      parseInt(request.query.pageSize as string),
      parseInt(request.query.page as string)
    );

    response.json(successResponse(categoryResponse));
  }
}

export default CatalogueStockController;
