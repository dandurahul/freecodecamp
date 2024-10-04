import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { IProductExemptionController } from "../../contracts/i-product-exemptions.controller";
import { IProductExemptionsService } from "../../../application/contracts/product-exemptions/i-product-exemptions.service";
import { ProductExemptionModel } from "../../../domain/models/exemptions/product-exemption.model";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { appError } from "../../models/global-error-handler.model";

@injectable()
export class ProductExemptionController implements IProductExemptionController {
  @inject(ContainerTypes.ProductExemptionsService)
  private productExemptionsService!: IProductExemptionsService;

  public async createProductExemption(
    request: Request,
    response: Response
  ): Promise<void> {
    let productExemptionModel: ProductExemptionModel = request.body;
    const storeCatalogueResponse =
      await this.productExemptionsService.createProductExemption(
        productExemptionModel
      );
    response.json(successResponse(storeCatalogueResponse));
  }

  async getProductExemptionById(
    request: Request,
    response: Response
  ): Promise<void> {
    const catalogueResponse =
      await this.productExemptionsService.getProductExemptionById(
        request.params.id
      );

    if (!catalogueResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);

    response.json(successResponse(catalogueResponse));
  }

  async getAllProductExemptions(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType }: any = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.productExemptionsService.getAllProductExemptions(
          filterType,
          request.query.activeFlag as any
        )
      )
    );
  }

  async updateProductExemption(
    request: Request,
    response: Response
  ): Promise<void> {
    const productExemptionModel: ProductExemptionModel = request.body;
    const catalogueResponse =
      await this.productExemptionsService.updateProductExemption(
        request.params.id,
        productExemptionModel
      );

    if (catalogueResponse) {
      response.json(successResponse(catalogueResponse));
    } else {
      response.status(404).json({ message: ErrorConstants.ITEM_NOT_FOUND });
    }
  }

  async deleteProductExemption(
    request: Request,
    response: Response
  ): Promise<void> {
    const id: string = request.params.id;
    await this.productExemptionsService.deleteProductExemption(id);
    response.send(
      successResponse({
        message: ErrorConstants.PRODUCT_EXCEMPTION_DELETED_SUCCESSFULLY,
      })
    );
    response
      .status(ErrorConstants.INTERNAL_SERVER_ERROR)
      .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
  }

  async filterProductExemption(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, filterCriteria, pageSize, page }: any =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.productExemptionsService.filterProductExemptions(
          filterCriteria,
          pageSize,
          page,
          filterType
        )
      )
    );
  }
}

export default ProductExemptionController;
