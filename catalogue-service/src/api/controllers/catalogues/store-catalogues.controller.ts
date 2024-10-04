import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { IStoreCatalogueService } from "../../../application/contracts/catalogues/i-store-catalogue.service";
import { IStoreCatalogueController } from "../../contracts/i-store-catalogues.controller";
import { StoreCatalogueModel } from "../../../domain/models/catalogues/store-catalogue.model";
import { FilterConstants } from "../../constants/filter.constants";
import { IStoreCatalogueFilterService } from "../../../application/contracts/catalogues/i-store-catalogue-filter.service";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { validateBoolean } from "../../../application/utils/filter-functions";

@injectable()
export class StoreCatalogueController implements IStoreCatalogueController {
  @inject(ContainerTypes.StoreCatalogueService)
  private storeCatalogueService!: IStoreCatalogueService;
  @inject(ContainerTypes.StoreCatalogueFilterService)
  private storeCatalogueFilterService!: IStoreCatalogueFilterService;

  public async createStoreCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {
    let storeCatalogueModel: StoreCatalogueModel = request.body;

    let storeCatalogueResponse =
      request.query.filterType == "Bulk"
        ? await this.storeCatalogueService.createStoreCatalogues(request.body)
        : await this.storeCatalogueService.createStoreCatalogue(
            storeCatalogueModel
          );

    response.json(successResponse(storeCatalogueResponse));
  }

  public async createStoreCatalogueProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    let businessUnitId = request.headers[
      FilterConstants.BUSINESS_UNIT_ID
    ] as string;

    let storeCatalogueResponse =
      await this.storeCatalogueService.createStoreCatalogueProducts(
        request.params.entityInternalId,
        request.body?.productIds || [],
        businessUnitId
      );
    response.json(successResponse(storeCatalogueResponse));
  }

  async getStoreCatalogues(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, pageSize, page } = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        filterType && filterType === FilterConstants.PAGINATION
          ? await this.storeCatalogueService.filterByPagination(
              {},
              pageSize,
              page
            )
          : await this.storeCatalogueService.getStoreCatalogues(
              filterType,
              pageSize,
              page
            )
      )
    );
  }

  async getStoreCatalogueById(
    request: Request,
    response: Response
  ): Promise<void> {
    const catalogueResponse =
      await this.storeCatalogueService.getStoreCatalogueById(request.params.id);
    if (catalogueResponse) {
      response.json(successResponse(catalogueResponse));
    } else {
      response
        .status(ErrorConstants.NOT_FOUND)
        .json({ message: ErrorConstants.ITEM_NOT_FOUND });
    }
  }

  async updateStoreCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {
    const id: string = request.params.id;
    const storeCatalogueModel: StoreCatalogueModel = request.body;

    let catalogueResponse =
      request.query.filterType == "Bulk"
        ? await this.storeCatalogueService.updateStoreCatalogues(request.body)
        : await this.storeCatalogueService.updateStoreCatalogue(
            request.params.id,
            storeCatalogueModel
          );

    if (catalogueResponse) {
      response.json(successResponse(catalogueResponse));
    } else {
      response
        .status(ErrorConstants.NOT_FOUND)
        .json({ message: ErrorConstants.ITEM_NOT_FOUND });
    }
  }

  async deleteStoreCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {
    const id: string = request.params.id;
    await this.storeCatalogueService.deleteStoreCatalogue(id);
    response.send(successResponse({ message: "Category deleted sucessfully" }));
  }

  async filterStoreCatalogue(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, filterCriteria, pageSize, page } =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        filterType && filterType === FilterConstants.PAGINATION
          ? await this.storeCatalogueService.filterByPagination(
              filterCriteria,
              pageSize,
              page
            )
          : await this.storeCatalogueService.filterStoreCatalogue(
              filterType,
              filterCriteria,
              pageSize,
              page
            )
      )
    );
  }

  async filterActiveStoreCatalogueProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, filterCriteria, pageSize, page } =
      buildRequestFilterParameters(request);
    let extendedCatalogFlag = validateBoolean(request, "extendedCatalogFlag");
    response.json(
      successResponse(
        filterType && filterType === FilterConstants.PAGINATION
          ? await this.storeCatalogueService.filterByPagination(
              filterCriteria,
              pageSize,
              page
            )
          : await this.storeCatalogueService.filterActiveStoreCatalogueProducts(
              request.params.entityInternalId,
              filterCriteria,
              filterType,
              pageSize,
              page,
              extendedCatalogFlag
            )
      )
    );
  }

  async getStoreProduct(request: Request, response: Response): Promise<void> {
    let { filterCriteria, filterType } = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.storeCatalogueService.getStoreProduct(
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
    let filterCriteria = request.body;
    response.json(
      successResponse(
        await this.storeCatalogueFilterService.getProductCountBasedOnStores(
          filterCriteria
        )
      )
    );
  }

  async updateStoreCatalogueProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    const query: Object = request.body.updateQuery;
    const updateCatalogue: any = request.body.updateData;
    const storeCatalogue =
      await this.storeCatalogueService.updateStoreCatalogueProducts(
        query,
        updateCatalogue
      );
    response.json(successResponse(storeCatalogue));
  }

  async updateProductVariants(
    request: Request,
    response: Response
  ): Promise<void> {
    const variants = await this.storeCatalogueService.updateProductVariants(
      request.body
    );
    response.json(successResponse(variants));
  }

  async updateStoreCatalogueVariants(
    request: Request,
    response: Response
  ): Promise<void> {
    let filterType = request.query.filterType as string;
    const updateCatalogue: StoreCatalogueModel[] = request.body;
    const globalCatalogue =
      await this.storeCatalogueService.updateStoreCatalogueVariants(
        updateCatalogue,
        filterType
      );
    response.json(successResponse(globalCatalogue));
  }

  async getUnSyncedProducts(
    request: Request,
    response: Response
  ): Promise<void> {
    const highlightId: string = request.body?.highlightId || "";
    const globalCatalogue =
      await this.storeCatalogueFilterService.getUnSyncedProductBasedOnStores(
        highlightId
      );
    response.json(successResponse(globalCatalogue));
  }
  async filterProductVariants(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterCriteria, filterType, pageSize, page } =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.storeCatalogueService.filterStoreCatalogueVariants(
          filterCriteria,
          filterType,
          pageSize,
          page
        )
      )
    );
}}

export default StoreCatalogueController;
