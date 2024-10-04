import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { IHighlightController } from "../../contracts/i-highlight.controller";
import { IHighlightService } from "../../../application/contracts/categories/i-product-highlight.service";
import { HighlightModel } from "../../../domain/models/catagories/highlight.model";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { HighlightFilterModel } from "../../../domain/models/catagories/filter/highlight-filter.model";
import { FilterConstants } from "../../constants/filter.constants";
import { appError } from "../../models/global-error-handler.model";

@injectable()
export class HighlightController implements IHighlightController {
  @inject(ContainerTypes.HighlightService)
  private highlightService!: IHighlightService;

  public async createHighlight(
    request: Request,
    response: Response
  ): Promise<void> {
    let highlight: HighlightModel = request.body;

    const highlightResponse = await this.highlightService.createHighlight(
      highlight
    );
    response.json(successResponse(highlightResponse));
  }

  async getAllHighlights(request: Request, response: Response): Promise<void> {
    let { filterType, pageSize, page }: any =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.highlightService.getAllHighlights(
          filterType,
          pageSize,
          page
        )
      )
    );
  }

  async updateHighlights(request: Request, response: Response): Promise<void> {
    const query: Object = request.body.updateQuery;
    const updateData: HighlightModel = request.body.updateData;
    response.send(
      successResponse(
        await this.highlightService.updateManyHighlights(query, updateData)
      )
    );
  }

  async getHighlightById(request: Request, response: Response): Promise<void> {
    const highlightResponse = await this.highlightService.getHighlightById(
      request.params.id
    );

    if (!highlightResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);

    response.json(successResponse(highlightResponse));

  }

  async updateHighlight(request: Request, response: Response): Promise<void> {
    const highlightModel: HighlightModel = request.body;
    const highlightResponse = await this.highlightService.updateHighlight(
      request.params.id,
      highlightModel
    );
    if (!highlightResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);

    response.json(successResponse(highlightResponse));
  }

  async deleteHighlight(request: Request, response: Response): Promise<void> {
    await this.highlightService.deleteHighlight(request.params.id);
    response.send(
      successResponse({
        message: ErrorConstants.HIGHLIGHT_DELETED_SUCCESSFULLY,
      })
    );
  }

  async filterHighlights(request: Request, response: Response): Promise<void> {
    let { filterType, filterCriteria, pageSize, page }: any =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        filterType === FilterConstants.PAGINATION
          ? await this.highlightService.paginationByFilter(
            filterCriteria,
            pageSize,
            page
          )
          : await this.highlightService.filterHighlights(
            filterCriteria,
            filterType,
            pageSize,
            page
          )
      )
    );
  }

  async syncProductHighlights(request: Request, response: Response) {
    let highlight: HighlightFilterModel = request.body;
    let { filterType } = buildRequestFilterParameters(request);
    let result = await this.highlightService.syncProductHighlights(
      highlight,
      filterType
    );
    response.json(successResponse(result));
  }

  async findOrCreateHighlights(
    request: Request,
    response: Response
  ): Promise<void> {
    response.json(
      successResponse(
        await this.highlightService.findOrCreateHighlights(
          request.body.productHighlights
        )
      )
    );
  }
}

export default HighlightController;
