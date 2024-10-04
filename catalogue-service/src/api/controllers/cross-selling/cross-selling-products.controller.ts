import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { ICrossSellingProductController } from "../../contracts/i-cross-selling-products.controller";
import { ICrossSellingProductService } from "../../../application/contracts/cross-selling/i-cross-selling-products.service";
import { CrossSellingProductsModel } from "../../../domain/models/cross-selling/cross-selling-products.model";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { appError } from "../../models/global-error-handler.model";

@injectable()
export class CrossSellingProductsController
  implements ICrossSellingProductController {
  @inject(ContainerTypes.CrossSellingProductsService)
  private crossSellingProductService!: ICrossSellingProductService;

  public async createCrossSellingProduct(
    request: Request,
    response: Response
  ): Promise<void> {
    let crossSellingProductModel: CrossSellingProductsModel = request.body;
    const storeCatalogueResponse =
      await this.crossSellingProductService.createCrossSellingProduct(
        crossSellingProductModel
      );
    response.json(successResponse(storeCatalogueResponse));
  }

  async getCrossSellingProductById(
    request: Request,
    response: Response
  ): Promise<void> {
    const catalogueResponse =
      await this.crossSellingProductService.getCrossSellingProductById(
        request.params.id
      );

    if (catalogueResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);
    response.json(successResponse(catalogueResponse));
  }

  async getAllCrossSellingProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType } = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.crossSellingProductService.getAllCrossSellingProducts(
          filterType
        )
      )
    );
  }

  async updateCrossSellingProduct(
    request: Request,
    response: Response
  ): Promise<void> {
    const crossSellingProductModel: CrossSellingProductsModel = request.body;
    const catalogueResponse =
      await this.crossSellingProductService.updateCrossSellingProduct(
        request.params.id,
        crossSellingProductModel
      );

    if (catalogueResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);
    response.json(successResponse(catalogueResponse));
  }

  async deleteCrossSellingProduct(
    request: Request,
    response: Response
  ): Promise<void> {
    const id: string = request.params.id;
    await this.crossSellingProductService.deleteCrossSellingProduct(id);

    response.send(
      successResponse({
        message: ErrorConstants.PRODUCT_EXCEMPTION_DELETED_SUCCESSFULLY,
      })
    );
  }

  async filterCrossSellingProduct(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterCriteria, filterType, pageSize, page } =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.crossSellingProductService.filterCrossSellingProducts(
          filterCriteria,
          pageSize,
          page,
          filterType
        )
      )
    );
  }
}

export default CrossSellingProductsController;
