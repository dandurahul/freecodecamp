import { CategoryModel } from "../../../domain/models/catagories/category.model";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";

export interface ICategoryService {
  createCategory(category: CategoryModel): Promise<CategoryModel>;

  getCategoryById(
    _id: string,
    filterType: string | undefined
  ): Promise<CategoryModel>;
  getCategories(
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<CategoryModel[]>;
  updateCategory(id: string, category: CategoryModel): Promise<CategoryModel>;
  deleteCategory(id: string): Promise<void>;
  filterCatagory(
    query: any,
    filterType: string | undefined,
    page: number,
    pageSize: number,
    fetchType: string | undefined
  ): Promise<CategoryModel[]>;
  filterCatagoryByPagination(
    query: any,
    fetchType: string | undefined,
    page: number,
    pageSize: number,
  ): Promise<PaginationModel>;
  createCategories(categoryModels: CategoryModel[]): Promise<CategoryModel[]>;
  updateCategories(categoryModels: CategoryModel[]): Promise<CategoryModel[]>;

  getCategoriesBySearchText(
    searchKey: string,
    getCategoriesBySearchText: string | undefined
  ): Promise<any>;

  getTreeForAllCategories(filterCriteria: any): Promise<any>;
  getCategorizationBasedOnProductIds(
    requestBody: any,
    filterType: string,
    extendedCatalogFlag: boolean,
    allowedOutOfStock: boolean
  ): Promise<any>;
  updateManyCategories(
    updateQuery: object,
    updateData: CategoryModel
  ): Promise<void>;
  findOrCreateCategories(categories: CategoryModel): Promise<any>;
}
