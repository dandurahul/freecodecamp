import { SubCategoryFilterModel } from "../../../../domain/models/catagories/filter/sub-category-filter.model";
import { ISubCategoryEntity } from "../../entities/categories/sub-category.entity";

export interface ISubCategoryRepository {
  createSubCategory(
    subCategory: ISubCategoryEntity
  ): Promise<ISubCategoryEntity>;

  getSubCategory(
    subCategory?: SubCategoryFilterModel,
    populate?: any
  ): Promise<ISubCategoryEntity>;
  getAllSubCategories(filterType: string): Promise<ISubCategoryEntity[]>;
  updateSubCategory(
    id: string,
    subCategory: ISubCategoryEntity
  ): Promise<ISubCategoryEntity>;
  deleteSubCategory(id: string): Promise<void>;
  filterSubCategory(
    filterCriteria: Object,
    filterType?: string,
    pageSize?: number,
    page?: number
  ): Promise<ISubCategoryEntity[]>;
  createSubCategories(
    classification: ISubCategoryEntity[]
  ): Promise<ISubCategoryEntity[]>;
  updateSubCategories(classification: any[]): Promise<any>;
  updateManySubCategory(
    updateQuery: object,
    updateData: ISubCategoryEntity
  ): Promise<void>;
  filterSubCatagoryByPagination(
    filterCriteria: Object,
    filterType: string,
    pageSize?: number,
    page?: number,
  ): Promise<any>
}
