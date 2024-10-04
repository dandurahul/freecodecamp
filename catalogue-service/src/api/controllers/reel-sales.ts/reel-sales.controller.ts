import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { Request, Response } from "express";
import { successResponse } from "../../models/response.model";
import { IReelSalesService } from "../../../application/contracts/reel-sales/i-reel-sales.service";
import { IReelSalesController } from "../../contracts/reel-sales.controller";
import { IReelSalesEntity } from "../../../infrastructure/repositories/entities/reel-sales/reel-sales.entity";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import ErrorConstants from "../../constants/error-constants";
import { FilterConstants } from "../../constants/filter.constants";

@injectable()
export class ReelSalesController implements IReelSalesController {
  @inject(ContainerTypes.ReelSalesService)
  private ReelSalesService!: IReelSalesService;

  async createReelSales(request: Request, response: Response): Promise<any> {
    const ReqBody: IReelSalesEntity = request.body;
    const reelSales = await this.ReelSalesService.createReelSales(ReqBody);
    response.json(successResponse(reelSales));
  }
  async getReelSales(request: Request, response: Response): Promise<any> {
    let { filterCriteria, filterType, pageSize, page }: any =
      buildRequestFilterParameters(request);
    const reelSales = await this.ReelSalesService.getReelSales(
      filterCriteria,
      filterType,
      pageSize,
      page
    );
    response.json(successResponse(reelSales));
  }
  async getReelSalesById(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const reelSales = await this.ReelSalesService.getReelSalesById(id);
    response.json(successResponse(reelSales));
  }
  async updateReelSales(request: Request, response: Response): Promise<any> {
    const id = request.params;
    const ReqBody: IReelSalesEntity = request.body;
    const reelSales = await this.ReelSalesService.updateReelSales(id, ReqBody);
    response.json(successResponse(reelSales));
  }
  async deleteReelSales(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const reelSales = await this.ReelSalesService.deleteReelSales(id);
    response.send(
      successResponse({
        message: ErrorConstants.REEL_SALES_DELETED_SUCCESSFULLY,
      })
    );
  }
  async filterReelSales(request: Request, response: Response): Promise<any> {
    let { filterCriteria, filterType, pageSize, page, sort } =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        filterType && filterType === FilterConstants.PAGINATION
          ? await this.ReelSalesService.filterByPagination(
              filterCriteria,
              pageSize,
              page
            )
          : await this.ReelSalesService.filterReelSales(
              filterCriteria,
              filterType,
              pageSize,
              page,
              sort
            )
      )
    );
  }
  async updateByAction(request: Request, response: Response): Promise<any> {
    const id = request.params.id;
    const action = request.params.action;
    await this.ReelSalesService.updateByAction(id, action);
    response.send(
      successResponse({
        message: ErrorConstants.UPDATED_SUCCESSFULLY,
      })
    );
  }
}
