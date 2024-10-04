import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { FilterConstants } from "../../constants/filter.constants";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { CatalogueModel } from "../../../domain/models/catalogues/catalogue.model";
import { ICatalogueService } from "../../../application/contracts/catalogues/i-catalogue.service";
import { IStoreCatalogueFilterService } from "../../../application/contracts/catalogues/i-store-catalogue-filter.service";
import { ICatalogueController } from "../../contracts/i-catalogue-controller";

@injectable()
export class AndroidCatalogueController implements ICatalogueController {
  @inject(ContainerTypes.AndroidCatalogueService)
  private androidCatalogueService!: ICatalogueService;
  @inject(ContainerTypes.AndroidCatalogueFilterService)
  private androidCatalogueFilterService!: IStoreCatalogueFilterService;

  public async createCatalogue(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      let androidCatalogueModel: CatalogueModel = request.body;
      const androidCatalogueResponse =
        await this.androidCatalogueService.createCatalogue(
          androidCatalogueModel
        );
      response.json(successResponse(androidCatalogueResponse));
    } catch (error) {
      console.log(error);
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  public async createCatalogueProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      let androidCatalogueResponse =
        await this.androidCatalogueService.createCatalogueProducts(
          request.params.entityInternalId,
          request.body?.productIds || []
        );
      response.json(successResponse(androidCatalogueResponse));
    } catch (error) {
      console.log(error);
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async getCatalogues(request: Request, response: Response): Promise<void> {
    try {
      let { filterType, pageSize, page } =
        buildRequestFilterParameters(request);
      response.json(
        successResponse(
          filterType && filterType === FilterConstants.PAGINATION
            ? await this.androidCatalogueService.filterByPagination(
                {},
                pageSize,
                page
              )
            : await this.androidCatalogueService.getCatalogues(
                filterType,
                pageSize,
                page
              )
        )
      );
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async getCatalogueById(request: Request, response: Response): Promise<void> {
    try {
      const catalogueResponse =
        await this.androidCatalogueService.getCatalogueById(request.params.id);
      if (catalogueResponse) {
        response.json(successResponse(catalogueResponse));
      } else {
        response
          .status(ErrorConstants.NOT_FOUND)
          .json({ message: ErrorConstants.ITEM_NOT_FOUND });
      }
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async updateCatalogue(request: Request, response: Response): Promise<void> {
    try {
      const id: string = request.params.id;
      const AndroidCatalogueModel: CatalogueModel = request.body;
      const catalogueResponse =
        await this.androidCatalogueService.updateCatalogue(
          request.params.id,
          AndroidCatalogueModel
        );

      if (catalogueResponse) {
        response.json(successResponse(catalogueResponse));
      } else {
        response
          .status(ErrorConstants.NOT_FOUND)
          .json({ message: ErrorConstants.ITEM_NOT_FOUND });
      }
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async deleteCatalogue(request: Request, response: Response): Promise<void> {
    try {
      const id: string = request.params.id;
      let result = await this.androidCatalogueService.deleteCatalogue(id);
      response.send(successResponse(result));
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async filterCatalogue(request: Request, response: Response): Promise<void> {
    try {
      let { filterType, filterCriteria, pageSize, page } =
        buildRequestFilterParameters(request);
      response.json(
        successResponse(
          filterType && filterType === FilterConstants.PAGINATION
            ? await this.androidCatalogueService.filterByPagination(
                filterCriteria,
                pageSize,
                page
              )
            : await this.androidCatalogueService.filterCatalogue(
                filterType,
                filterCriteria,
                pageSize,
                page
              )
        )
      );
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }
  async getCatalogueProduct(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterCriteria, filterType } = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.androidCatalogueService.getCatalogueProduct(
          filterCriteria,
          filterType
        )
      )
    );
  }

  async filterActiveCatalogueProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      let { filterType, filterCriteria, pageSize, page } =
        buildRequestFilterParameters(request);
      let { extendedCatalogFlag } = request.query as any;
      response.json(
        successResponse(
          filterType && filterType === FilterConstants.PAGINATION
            ? await this.androidCatalogueService.filterByPagination(
                filterCriteria,
                pageSize,
                page
              )
            : await this.androidCatalogueService.filterActiveCatalogueProducts(
                request.params.entityInternalId,
                filterCriteria,
                filterType,
                pageSize,
                page,
                extendedCatalogFlag
              )
        )
      );
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async getProductCountBasedOnStores(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      let filterCriteria = request.body;
      response.json(
        successResponse(
          await this.androidCatalogueFilterService.getProductCountBasedOnStores(
            filterCriteria
          )
        )
      );
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async updateCatalogueProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const query: Object = request.body.updateQuery;
      const updateCatalogue: any = request.body.updateData;
      const storeCatalogue =
        await this.androidCatalogueService.updateCatalogueProducts(
          query,
          updateCatalogue
        );
      response.json(successResponse(storeCatalogue));
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async updateProductVariants(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const variants = await this.androidCatalogueService.updateProductVariants(
        request.body
      );
      response.json(successResponse(variants));
    } catch (error) {
      console.log({ error });
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async updateCatalogueVariants(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const updateCatalogue: CatalogueModel[] = request.body;
      const globalCatalogue =
        await this.androidCatalogueService.updateCatalogueVariants(
          updateCatalogue
        );
      response.json(successResponse(globalCatalogue));
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ message: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }
}

export default AndroidCatalogueController;
