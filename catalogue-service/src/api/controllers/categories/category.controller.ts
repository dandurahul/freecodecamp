import { Request, Response, query } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { successResponse } from "../../models/response.model";
import { ICategoryController } from "../../contracts/i-catategory.controller";
import { ICategoryService } from "../../../application/contracts/categories/i-category.service";
import { CategoryModel } from "../../../domain/models/catagories/category.model";
import ErrorConstants from "../../constants/error-constants";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { appError } from "../../models/global-error-handler.model";
import { validateBoolean } from "../../../application/utils/filter-functions";
import { FilterConstants } from "../../constants/filter.constants";

@injectable()
export class CategoryController implements ICategoryController {
  @inject(ContainerTypes.CategoryService)
  private catagoryService!: ICategoryService;

  public async createCategory(
    request: Request,
    response: Response
  ): Promise<void> {
    let categoryModel: CategoryModel = request.body;
    const catagoryResponse = await this.catagoryService.createCategory(
      categoryModel
    );
    response.json(successResponse(catagoryResponse));
  }

  async updateCategories(request: Request, response: Response): Promise<void> {
    const query: Object = request.body.updateQuery;
    const updateData: CategoryModel = request.body.updateData;
    response.send(
      successResponse(
        await this.catagoryService.updateManyCategories(query, updateData)
      )
    );
  }

  async getAllCategories(request: Request, response: Response): Promise<void> {
    let { filterType, pageSize, page } = buildRequestFilterParameters(request);
    response.json(
      successResponse(
        await this.catagoryService.getCategories(filterType, pageSize, page)
      )
    );
  }

  async getCategoryById(request: Request, response: Response): Promise<void> {
    const id: string = request.params.id;
    const categoryResponse = await this.catagoryService.getCategoryById(
      id,
      request.query?.filterType as any
    );
    if (!categoryResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);
    response.json(successResponse(categoryResponse));
  }

  async getCategoriesBySearchText(
    request: Request,
    response: Response
  ): Promise<void> {
    const searchKey: string = request.query.searchKey as any;
    let { businessUnitId } = request.body;
    const categoryResponse =
      await this.catagoryService.getCategoriesBySearchText(
        searchKey,
        businessUnitId
      );
    response.json(successResponse(categoryResponse));
  }

  async updateCategory(request: Request, response: Response): Promise<void> {
    const categoryModel: CategoryModel = request.body;
    const categoryResponse = await this.catagoryService.updateCategory(
      request.params.id,
      categoryModel
    );

    if (!categoryResponse)
      throw appError(ErrorConstants.ITEM_NOT_FOUND, ErrorConstants.NOT_FOUND);
    response.json(successResponse(categoryResponse));
  }

  async deleteCategory(request: Request, response: Response): Promise<void> {
    const id: string = request.params.id;
    await this.catagoryService.deleteCategory(id);
    response.send(
      successResponse({
        message: ErrorConstants.CATEGORY_DELETED_SUCCESSFULLY,
      })
    );
  }

  async getTreeForAllCategories(
    request: Request,
    response: Response
  ): Promise<void> {
    const filterCriteria: any = request.body;
    const categoryTreeResponse =
      await this.catagoryService.getTreeForAllCategories(filterCriteria);
    response.json(successResponse(categoryTreeResponse));
  }

  async filterCategory(request: Request, response: Response): Promise<void> {
    let fetchType = request.query.fetchType as any;
    let { filterType, filterCriteria, pageSize, page } =
      buildRequestFilterParameters(request);
    response.json(
      successResponse(
        filterType && filterType === FilterConstants.PAGINATION
          ? await this.catagoryService.filterCatagoryByPagination(
              filterCriteria,
              fetchType,
              page,
              pageSize
            )
          : await this.catagoryService.filterCatagory(
              filterCriteria,
              filterType,
              page,
              pageSize,
              fetchType
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

  async getCategorizationBasedOnProductIds(
    request: Request,
    response: Response
  ): Promise<void> {
    let filterType = request.query.filterType as any;
    let extendedCatalogFlag = validateBoolean(request, "extendedCatalogFlag");
    let allowedOutOfStock = validateBoolean(request, "allowedOutOfStock");
    response.json(
      successResponse(
        await this.catagoryService.getCategorizationBasedOnProductIds(
          request.body,
          filterType,
          extendedCatalogFlag,
          allowedOutOfStock
        )
      )
    );
  }

  async findOrCreateCategories(
    request: Request,
    response: Response
  ): Promise<void> {
    response.json(
      successResponse(
        await this.catagoryService.findOrCreateCategories(
          request.body.categories
        )
      )
    );
  }
}

export default CategoryController;
