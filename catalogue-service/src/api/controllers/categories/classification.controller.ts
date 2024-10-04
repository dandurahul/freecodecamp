import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IClassificationController } from "../../contracts/i-classification.controller";
import { IClassificationService } from "../../../application/contracts/categories/i-classification.service";
import { ContainerTypes } from "../../bindings/container-types";
import { ClassificationModel } from "../../../domain/models/catagories/classification.model";
import { successResponse } from "../../models/response.model";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import ErrorConstants from "../../constants/error-constants";
import { appError } from "../../models/global-error-handler.model";
import { validateBoolean } from "../../../application/utils/filter-functions";

@injectable()
export class ClassificationController implements IClassificationController {
  @inject(ContainerTypes.ClassificationService)
  private classificationService!: IClassificationService;

  public async createClassification(
    request: Request,
    response: Response
  ): Promise<void> {
    let subCategoryModel: ClassificationModel = request.body;
    const subCatagoryResponse =
      await this.classificationService.createClassification(subCategoryModel);
    response.json(successResponse(subCatagoryResponse));
  }

  async getAllClassifications(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType }: any = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.classificationService.getAllClassifications(filterType)
      )
    );
  }

  async getClassificationById(
    request: Request,
    response: Response
  ): Promise<void> {
    const id: string = request.params.id;
    const subCategoryResponse =
      await this.classificationService.getClassificationById(id);

    if (!subCategoryResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);

    response.json(successResponse(subCategoryResponse));
  }

  async updateClassification(
    request: Request,
    response: Response
  ): Promise<void> {
    const id: string = request.params.id;
    const subCategoryModel: ClassificationModel = request.body;
    let extendedCatalogFlag = validateBoolean(request, "extendedCatalogFlag");
    const subCategoryResponse =
      await this.classificationService.updateClassification(
        id,
        subCategoryModel,
        extendedCatalogFlag
      );

    if (!subCategoryResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);
    response.json(successResponse(subCategoryResponse));
  }

  async deleteClassification(
    request: Request,
    response: Response
  ): Promise<void> {
    const id: string = request.params.id;
    await this.classificationService.deleteClassification(id);
    response.send(
      successResponse({
        message: ErrorConstants.CLASSICATION_DELETED_SUCCESSFULLY,
      })
    );
  }

  async updatClassifications(
    request: Request,
    response: Response
  ): Promise<void> {
    const query: Object = request.body.updateQuery;
    const updateCatalogue: ClassificationModel = request.body.updateData;
    response.send(
      successResponse(
        await this.classificationService.updateManyClassifications(
          query,
          updateCatalogue
        )
      )
    );
  }

  async filterClassification(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, filterCriteria, pageSize, page }: any =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.classificationService.filterClassification(
          filterCriteria,
          filterType,
          pageSize,
          page
        )
      )
    );
  }

  filterCategoryBypagination(
    request: Request,
    response: Response
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findOrCreateClassifications(
    request: Request,
    response: Response
  ): Promise<void> {
    let extendedCatalogFlag = validateBoolean(request, "extendedCatalogFlag");
    response.json(
      successResponse(
        await this.classificationService.findOrCreateClassification(
          request.body.classifications,
          extendedCatalogFlag
        )
      )
    );
  }
}

export default ClassificationController;
