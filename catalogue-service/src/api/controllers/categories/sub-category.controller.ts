import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ISubCategoryController } from "../../contracts/i-sub-category.controller";
import { ContainerTypes } from "../../bindings/container-types";
import { ISubCategoryService } from "../../../application/contracts/categories/i-sub-category.service";
import { SubCategoryModel } from "../../../domain/models/catagories/sub-category.model";
import { successResponse } from "../../models/response.model";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { appError } from "../../models/global-error-handler.model";
import { validateBoolean } from "../../../application/utils/filter-functions";
import { FilterConstants } from "../../constants/filter.constants";

@injectable()
export class SubCategoryController implements ISubCategoryController {
  @inject(ContainerTypes.SubCategoryService)
  private subCatagoryService!: ISubCategoryService;

  public async createSubCategory(
    request: Request,
    response: Response
  ): Promise<void> {
    let subCategoryModel: SubCategoryModel = request.body;
    const subCatagoryResponse = await this.subCatagoryService.createSubCategory(
      subCategoryModel
    );
    response.json(successResponse(subCatagoryResponse));
  }

  async updateSubCategories(
    request: Request,
    response: Response
  ): Promise<void> {
    const query: Object = request.body.updateQuery;
    const updateData: SubCategoryModel = request.body.updateData;
    response.send(
      successResponse(
        await this.subCatagoryService.updateManySubCategories(query, updateData)
      )
    );
  }

  async getAllSubCategories(
    request: Request,
    response: Response
  ): Promise<void> {
    let { filterType, pageSize, page }: any =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.subCatagoryService.getAllSubCategories(
          filterType,
          pageSize,
          page
        )
      )
    );
  }

  async getSubCategoryById(
    request: Request,
    response: Response
  ): Promise<void> {
    const subCategoryResponse =
      await this.subCatagoryService.getSubCategoryById(
        request.params.id,
        request.query?.filterType as any
      );

    if (!subCategoryResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);

    response.json(successResponse(subCategoryResponse));
  }

  async updateSubCategory(request: Request, response: Response): Promise<void> {
    try {
      const subCategoryModel: SubCategoryModel = request.body;
      let extendedCatalogFlag = validateBoolean(request, "extendedCatalogFlag");
      const subCategoryResponse =
        await this.subCatagoryService.updateSubCategory(
          request.params.id,
          subCategoryModel,
          extendedCatalogFlag
        );

      if (subCategoryResponse) {
        response.json(successResponse(subCategoryResponse));
      } else {
        response.status(404).json({ message: ErrorConstants.ITEM_NOT_FOUND });
      }
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async deleteSubCategory(request: Request, response: Response): Promise<void> {
    try {
      const id: string = request.params.id;
      await this.subCatagoryService.deleteSubCategory(id);
      response.send(
        successResponse({
          message: ErrorConstants.SUB_CATEGORY_DELETED_SUCCESSFULLY,
        })
      );
    } catch (error) {
      response
        .status(ErrorConstants.INTERNAL_SERVER_ERROR)
        .json({ error: ErrorConstants.INTERNAL_SERVER_ERROR_MESSAGE });
    }
  }

  async filterSubCategory(request: Request, response: Response): Promise<void> {
    let { filterType, filterCriteria, pageSize, page }: any =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        filterType && filterType === FilterConstants.PAGINATION
          ? await this.subCatagoryService.filterSubCatagoryByPagination(
            filterCriteria,
            filterType,
            page,
            pageSize
          )
          : await this.subCatagoryService.filterSubCategory(
            filterCriteria,
            filterType,
            pageSize,
            page
          )
      )
    );
  }

  filterSubCategoryByPagination(
    request: Request,
    response: Response
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findOrCreateSubCategorys(
    request: Request,
    response: Response
  ): Promise<void> {
    let extendedCatalogFlag = validateBoolean(request, "extendedCatalogFlag");
    let { filterType } = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.subCatagoryService.findOrCreateSubCategorys(
          request.body.subCategories,
          extendedCatalogFlag,
          filterType
        )
      )
    );
  }
}

export default SubCategoryController;
