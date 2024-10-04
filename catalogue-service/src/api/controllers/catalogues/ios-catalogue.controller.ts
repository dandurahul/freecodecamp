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
export class IosCatalogueController implements ICatalogueController {
  @inject(ContainerTypes.IosCatalogueService)
  private iosCatalogueService!: ICatalogueService;
  @inject(ContainerTypes.IosCatalogueFilterService)
  private iosCatalogueFilterService!: IStoreCatalogueFilterService;

  public async createCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      let iosCatalogueModel: CatalogueModel = request.body;
      const posCatalogueResponse =
        await this.iosCatalogueService.createCatalogue(iosCatalogueModel);
      response.json(successResponse(posCatalogueResponse));
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
      let iosCatalogueResponse =
        await this.iosCatalogueService.createCatalogueProducts(
          request.params.entityInternalId,
          request.body?.productIds || []
        );
      response.json(successResponse(iosCatalogueResponse));
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
            ? await this.iosCatalogueService.filterByPagination(
                {},
                pageSize,
                page
              )
            : await this.iosCatalogueService.getCatalogues(
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
      const catalogueResponse = await this.iosCatalogueService.getCatalogueById(
        request.params.id
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

  async updateCatalogue(request: Request, response: Response): Promise<void> {
    try {
      const iosCatalogueModel: CatalogueModel = request.body;
      const catalogueResponse = await this.iosCatalogueService.updateCatalogue(
        request.params.id,
        iosCatalogueModel
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
      await this.iosCatalogueService.deleteCatalogue(id);
      response.send(
        successResponse({ message: "Category deleted sucessfully" })
      );
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
            ? await this.iosCatalogueService.filterByPagination(
                filterCriteria,
                pageSize,
                page
              )
            : await this.iosCatalogueService.filterCatalogue(
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
            ? await this.iosCatalogueService.filterByPagination(
                filterCriteria,
                pageSize,
                page
              )
            : await this.iosCatalogueService.filterActiveCatalogueProducts(
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

  async getCatalogueProduct(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterCriteria, filterType } = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.iosCatalogueService.getCatalogueProduct(
          filterCriteria,
          filterType
        )
      )
    );
  }

  async getProductCountBasedOnStores(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      let filterCriteria = request.body;
      response.json(
        successResponse(
          await this.iosCatalogueFilterService.getProductCountBasedOnStores(
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
      const iosCatalogue =
        await this.iosCatalogueService.updateCatalogueProducts(
          query,
          updateCatalogue
        );
      response.json(successResponse(iosCatalogue));
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
      const variants = await this.iosCatalogueService.updateProductVariants(
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
        await this.iosCatalogueService.updateCatalogueVariants(updateCatalogue);
      response.json(successResponse(globalCatalogue));
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ message: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }
}

export default IosCatalogueController;
