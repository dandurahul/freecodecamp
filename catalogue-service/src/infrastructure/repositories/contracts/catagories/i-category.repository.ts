import { ICategoryEntity } from "../../entities/categories/category.entity";

export interface ICategoryRepository {
  createCategory(categoryEntity: ICategoryEntity): Promise<ICategoryEntity>;
  createCategories(
    categoryEntity: ICategoryEntity[]
  ): Promise<ICategoryEntity[]>;
  getCategory(
    id: string,
    filterType?: string | undefined
  ): Promise<ICategoryEntity>;
  getAllCategories(filterType: string): Promise<ICategoryEntity[]>;
  updateCategory(
    id: string,
    categoryEntity: ICategoryEntity
  ): Promise<ICategoryEntity>;
  deleteCategory(id: string): Promise<void>;
  filterCategory(
    filterCriteria: Object,
    filterType?: string | undefined,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<ICategoryEntity[]>;
  filterCatagoryByPagination(
    filterCriteria: Object,
    fetchType?: string | undefined,
    pageSize?: number,
    page?: number,
  ): Promise<any>;
  updateCategories(categoryEntity: any[]): Promise<any>;
  updateManyCategories(
    updateQuery: object,
    updateData: ICategoryEntity
  ): Promise<void>;
}
