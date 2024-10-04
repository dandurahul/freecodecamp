import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ICategoryRepository } from "../../contracts/catagories/i-category.repository";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { ICategoryEntity } from "../../entities/categories/category.entity";
import { buildFilterObjectForCategory } from "../../helpers/catagory-filter.helper";
import { FilterConstants } from "../../../../application/constants/filter.constants";
import FilterTypeEnum from "../../../enums/filter.enum";

@injectable()
class CategoryRepository implements ICategoryRepository {
  @inject(ContainerTypes.CategoryRepositoryBase)
  private repositoryBase!: IRepositoryBase<ICategoryEntity>;

  async createCategory(category: ICategoryEntity): Promise<ICategoryEntity> {
    return this.repositoryBase.create(category);
  }

  async getCategory(
    _id: any,
    filterType: string | undefined
  ): Promise<ICategoryEntity> {
    let populate =
      filterType === FilterConstants.METADATA
        ? ""
        : FilterTypeEnum.POPULATE_CATEGORY_DATA;
    return this.repositoryBase.findOne({ _id: _id }, populate);
  }
  async getAllCategories(query: any): Promise<ICategoryEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateCategory(
    id: string,
    category: ICategoryEntity
  ): Promise<ICategoryEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      category
    )) as ICategoryEntity;
  }
  async deleteCategory(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterCategory(
    filterCriteria: Object,
    filterType: string,
    pageSize?: number,
    page?: number,
    fetchType?: string | undefined
  ): Promise<ICategoryEntity[]> {
    let filter = buildFilterObjectForCategory(
      filterCriteria,
      filterType,
      fetchType
    );
    return await this.repositoryBase.filter(
      filter?.filter ? filter.filter : {},
      filter?.fields,
      filter?.populate,
      filter?.aggregate,
      pageSize,
      page,
      filter?.sort
    );
  }

  filterCatagoryByPagination(
    filterCriteria: Object,
    fetchType?: string | undefined,
    pageSize?: number,
    page?: number,
  ): Promise<any> {
    let filter = buildFilterObjectForCategory(
      filterCriteria,
      "",
      fetchType
    );
    return this.repositoryBase.count(filter?.filter);
  }

  createCategories(
    categoryEntity: ICategoryEntity[]
  ): Promise<ICategoryEntity[]> {
    return this.repositoryBase.bulkInsert(categoryEntity);
  }

  updateCategories(data: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(data);
  }

  async updateManyCategories(
    updateQuery: object,
    updateData: ICategoryEntity
  ): Promise<void> {
    let filter = buildFilterObjectForCategory(updateQuery, "", "");
    if (updateData?.deleteFlag) {
      return this.repositoryBase.bulkDelete(filter?.filter);
    } else {
      return this.repositoryBase.updateMany(filter?.filter, updateData);
    }
  }
}
export default CategoryRepository;
