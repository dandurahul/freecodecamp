import { SubCategoryFilterModel } from "../../../domain/models/catagories/filter/sub-category-filter.model";
import { SubCategoryModel } from "../../../domain/models/catagories/sub-category.model";
import { PaginationModel } from "../../../domain/models/pagination/pagination.model";

export interface ISubCategoryService {
  createSubCategory(subCategory: SubCategoryModel): Promise<SubCategoryModel>;

  getSubCategoryById(
    _id: string,
    filterType: string | undefined
  ): Promise<SubCategoryModel>;
  getAllSubCategories(
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<SubCategoryModel[]>;
  updateSubCategory(
    id: string,
    subCategory: SubCategoryModel,
    extendedCatalogFlag: boolean
  ): Promise<SubCategoryModel>;
  deleteSubCategory(id: string): Promise<void>;
  filterSubCategory(
    filterCriteria: SubCategoryModel,
    filterType: string,
    pageSize: number,
    page: number
  ): Promise<SubCategoryModel[]>;
  createSubCategories(
    subCategoryModels: SubCategoryModel[]
  ): Promise<SubCategoryModel[]>;
  updateSubCategories(
    subCategoryModels: SubCategoryModel[]
  ): Promise<SubCategoryModel[]>;
  updateManySubCategories(
    updateQuery: object,
    updateData: SubCategoryModel
  ): Promise<void>;
  findOrCreateSubCategorys(
    subCatagory: SubCategoryModel,
    extendedCatalogFlag: boolean,
    filterType: string
  ): Promise<any>;
  filterSubCatagoryByPagination(
    filterCriteria: any,
    filterType: string,
    page: number,
    pageSize: number
  ): Promise<PaginationModel>
}
