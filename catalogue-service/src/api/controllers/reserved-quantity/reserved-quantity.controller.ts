import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { IReservedQuantityController } from "../../contracts/i-reserved-quantity.controller";
import { IReservedQuantityService } from "../../../application/contracts/reserved/i-reserved-quantity.service";
import { ReserveQuantityModel } from "../../../domain/models/reserved/reserved-quantity.model";
import { ErrorMessages } from "../../../application/constants/error-messages";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { appError } from "../../models/global-error-handler.model";

@injectable()
export class ReservedQuantityController implements IReservedQuantityController {
  @inject(ContainerTypes.ReservedQuantityService)
  private reservedQuantityService!: IReservedQuantityService;

  public async createReservedQuantity(
    request: Request,
    response: Response
  ): Promise<void> {
    let reservedQuantityModel: ReserveQuantityModel = request.body;
    const globalCatalogueResponse =
      await this.reservedQuantityService.createReservedQuantity(
        reservedQuantityModel
      );
    response.json(successResponse(globalCatalogueResponse));
  }

  public async getAllReservedQuantityDetails(
    request: Request,
    response: Response
  ): Promise<void> {
    let reservedQuantity: ReserveQuantityModel[] = request.body;
    let filterType = request.query.filterType as any;
    const globalCatalogueResponse =
      await this.reservedQuantityService.getAllReservedQuantityDetails(
        reservedQuantity,
        filterType
      );
    response.json(successResponse(globalCatalogueResponse));
  }

  async getReservedQuantityById(
    request: Request,
    response: Response
  ): Promise<void> {

    const reservedResponse =
      await this.reservedQuantityService.getReservedQuantityById(
        request.params.id
      );

    if (!reservedResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);

    response.json(successResponse(reservedResponse));
  }

  async updateReservedQuantity(
    request: Request,
    response: Response
  ): Promise<void> {

    const reservedQuantityModel: ReserveQuantityModel = request.body;
    const reservedResponse =
      await this.reservedQuantityService.updateReservedQuantity(
        request.params.id,
        reservedQuantityModel
      );

    if (reservedResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);
    response.json(successResponse(reservedResponse));
  }

  async deleteReservedQuantity(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.reservedQuantityService.deleteReservedQuantity(
      request.params.id
    );
    response.send(
      successResponse({
        message: ErrorMessages.DELETE_RESERVED_QUANTITY_SUCCESSFULLY,
      })
    );
  }

  async filterReservedQuantity(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, filterCriteria, pageSize, page }: any =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.reservedQuantityService.filterReservedQuantity(
          filterCriteria,
          pageSize,
          page,
          filterType
        )
      )
    );
  }

  async updateReservedQuantityWithStockDetails(
    req: Request,
    res: Response
  ): Promise<void> {
    let { filterType, filterCriteria } = buildRequestFilterParameters(req);
    res.json(
      successResponse(
        await this.reservedQuantityService.updateReservedQuantityWithStockDetails(
          filterCriteria,
          filterType
        )
      )
    );
  }
}

export default ReservedQuantityController;
