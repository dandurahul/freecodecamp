import { Request, Response, query } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { IUnavailableProductsService } from "../../../application/contracts/catalogues/i-unavailable-products.service";
import { validateBoolean } from "../../../application/utils/filter-functions";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import ErrorConstants from "../../constants/error-constants";
import { IUnavailableProductsController } from "../../contracts/i-unavailable-products.controller";
import { appError } from "../../models/global-error-handler.model";
import { UnavailableProductModel } from "../../../domain/models/catalogues/unavailable-products.model";

@injectable()
export class UnavailableProductsController
  implements IUnavailableProductsController
{
  @inject(ContainerTypes.UnavailableProductsService)
  private catagoryService!: IUnavailableProductsService;

  public async createUnavailableProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    let unavailableProductsModel: UnavailableProductModel[] = request.body;
    const catagoryResponse =
      await this.catagoryService.createUnavailableProducts(
        unavailableProductsModel
      );
    response.json(successResponse(catagoryResponse));
  }

  async filterUnavailableProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, filterCriteria, pageSize, page } =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.catagoryService.filterUnavailableProducts(
          filterCriteria,
          filterType,
          page,
          pageSize
        )
      )
    );
  }
}

export default UnavailableProductsController;
