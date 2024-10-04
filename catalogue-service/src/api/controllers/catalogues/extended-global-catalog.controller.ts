import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { ErrorMessages } from "../../../application/constants/error-messages";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { appError } from "../../models/global-error-handler.model";
import { IExtendedGlobalCatalogController } from "../../contracts/i-extended-global-catalog.controller";
import { IExtendedGlobalCatalogService } from "../../../application/contracts/catalogues/i-extended-global-catalog.service";
import { ExtendedGlobalCatalogModel } from "../../../domain/models/catalogues/extended-global-catalog.model";

@injectable()
export class ExtendedGlobalCatalogController
  implements IExtendedGlobalCatalogController
{
  @inject(ContainerTypes.ExtendedGlobalCatalogService)
  private ExtendedGlobalCatalogService!: IExtendedGlobalCatalogService;

  public async createExtendedGlobalCatalog(
    request: Request,
    response: Response
  ): Promise<void> {
    let ExtendedGlobalCatalogModel: ExtendedGlobalCatalogModel = request.body;
    const globalCatalogueResponse =
      await this.ExtendedGlobalCatalogService.createExtendedGlobalCatalog(
        ExtendedGlobalCatalogModel
      );
    response.json(successResponse(globalCatalogueResponse));
  }

  public async getExtendedGlobalCatalogs(
    request: Request,
    response: Response
  ): Promise<void> {
    let filterType = request.query.filterType as any;
    const globalCatalogueResponse =
      await this.ExtendedGlobalCatalogService.getAllExtendedGlobalCatalogDetails(
        filterType
      );
    response.json(successResponse(globalCatalogueResponse));
  }

  async getExtendedGlobalCatalogById(
    request: Request,
    response: Response
  ): Promise<void> {
    const reservedResponse =
      await this.ExtendedGlobalCatalogService.getExtendedGlobalCatalogById(
        request.params.id
      );

    if (!reservedResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);

    response.json(successResponse(reservedResponse));
  }

  async updateExtendedGlobalCatalog(
    request: Request,
    response: Response
  ): Promise<void> {
    const ExtendedGlobalCatalogModel: ExtendedGlobalCatalogModel = request.body;
    const reservedResponse =
      await this.ExtendedGlobalCatalogService.updateExtendedGlobalCatalog(
        request.params.id,
        ExtendedGlobalCatalogModel
      );

    if (!reservedResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);
    response.json(successResponse(reservedResponse));
  }

  async deleteExtendedGlobalCatalog(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.ExtendedGlobalCatalogService.deleteExtendedGlobalCatalog(
      request.params.id
    );
    response.send(
      successResponse({
        message: ErrorMessages.DELETE_RESERVED_QUANTITY_SUCCESSFULLY,
      })
    );
  }

  async filterExtendedGlobalCatalogs(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, filterCriteria, pageSize, page }: any =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.ExtendedGlobalCatalogService.filterExtendedGlobalCatalog(
          filterCriteria,
          pageSize,
          page,
          filterType
        )
      )
    );
  }

  async bulkUpdateForExtendedCatalogues(
    request: Request,
    response: Response
  ): Promise<void> {
    const query: Object = request.body.updateQuery;
    const updateCatalogue: ExtendedGlobalCatalogModel = request.body.updateData;
    const extendedCatalogue =
      await this.ExtendedGlobalCatalogService.bulkUpdateForExtendedCatalogues(
        query,
        updateCatalogue
      );
    response.json(successResponse(extendedCatalogue));
  }
}

export default ExtendedGlobalCatalogController;
