import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { IGlobalCatalogueController } from "../../contracts/i-global-catalogues.controller";
import { IGlobalCatalogueService } from "../../../application/contracts/catalogues/i-global-catalogue.service";
import { GlobalCatalogueModel } from "../../../domain/models/catalogues/global-catalogue.model";
import { FilterConstants } from "../../constants/filter.constants";
import { GlobalCatalogueDetailsModel } from "../../../domain/models/catalogues/global-catalogue-details.model";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { appError } from "../../models/global-error-handler.model";

@injectable()
export class GlobalCatalogueController implements IGlobalCatalogueController {
  @inject(ContainerTypes.GlobalCatalogueService)
  private globalCatalogueService!: IGlobalCatalogueService;

  public async createGlobalCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {

    let globalCatalogueModel: GlobalCatalogueModel = request.body;
    const globalCatalogueResponse =
      await this.globalCatalogueService.createGlobalCatalogue(
            globalCatalogueModel
          );
    response.json(successResponse(globalCatalogueResponse));
  }

  public async createGlobalCatalogues(
    request: Request,
    response: Response
  ): Promise<void> {
    let globalCatalogues: GlobalCatalogueDetailsModel[] = request.body;
    const globalCatalogueResponse =
      await this.globalCatalogueService.createGlobalCatalogues(
        globalCatalogues
      );
    response.json(successResponse(globalCatalogueResponse));
  }

  async getAllGlobalCatalogues(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, pageSize, page, filterCriteria } =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        filterType === FilterConstants.PAGINATION
          ? await this.globalCatalogueService.filterByPagination(
              {},
              pageSize,
              page
            )
          : await this.globalCatalogueService.getAllGlobalCatalogue(
              filterType,
              pageSize,
              page,
              filterCriteria
            )
      )
    );
  }

  async getGlobalCatalogueById(
    request: Request,
    response: Response
  ): Promise<void> {
    const catalogueResponse =
      await this.globalCatalogueService.getGlobalCatalogueById(
        request.params.id
      );

    if (!catalogueResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);

    response.json(successResponse(catalogueResponse));
  }

  async updateGlobalCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {
    const globalCatalogueModel: GlobalCatalogueModel = request.body;
    const catalogueResponse =
      await this.globalCatalogueService.updateGlobalCatalogue(
        request.params.id,
        globalCatalogueModel
      );
    if (!catalogueResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);

    response.json(successResponse(catalogueResponse));
  }

  async deleteGlobalCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.globalCatalogueService.deleteGlobalCatalogue(request.params.id);
    response.send(
      successResponse({
        message: ErrorConstants.CATEGORY_DELETED_SUCCESSFULLY,
      })
    );
  }

  async filterGlobalCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterCriteria, filterType, pageSize, page } =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        filterType === FilterConstants.PAGINATION
          ? await this.globalCatalogueService.filterByPagination(
              filterCriteria,
              pageSize,
              page
            )
          : await this.globalCatalogueService.filterGlobalCatalogue(
              filterCriteria,
              filterType,
              pageSize,
              page
            )
      )
    );
  }

  async getSuggestionsForSearchCriteria(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterCriteria, filterType } = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.globalCatalogueService.getSuggestionsForSearchCriteria(
          filterCriteria,
          filterType
        )
      )
    );
  }

  filterGlobalCatalogueByPagination(
    request: Request,
    response: Response
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async updateBulkStoreCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {
    const query: Object = request.body.updateQuery;
    const updateCatalogue: GlobalCatalogueModel = request.body.updateData;
    const globalCatalogue =
      await this.globalCatalogueService.updateBulkStoreCatalogue(
        query,
        updateCatalogue
      );
    response.json(successResponse(globalCatalogue));
  }

  async updateBulkVariants(
    request: Request,
    response: Response
  ): Promise<void> {
    const updateCatalogue: GlobalCatalogueModel[] = request.body;
    const globalCatalogue =
      await this.globalCatalogueService.updateBulkVarinats(
        updateCatalogue,
        request.query.filterType
      );
    response.json(successResponse(globalCatalogue));
  }

  async updateBulkCatalogProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    const updateCatalogue: GlobalCatalogueModel[] = request.body;
    const globalCatalogue =
      await this.globalCatalogueService.updateBulkCatalogProduct(
        updateCatalogue
      );
    response.json(successResponse(globalCatalogue));
  }
}

export default GlobalCatalogueController;
