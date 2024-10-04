import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { ISubCategoryEntity } from "../../entities/categories/sub-category.entity";
import { ISubCategoryRepository } from "../../contracts/catagories/i-sub-category.repository";
import { buildFilterObjectForSubCategory } from "../../helpers/sub-category-filter.helper";

@injectable()
class SubCategoryRepository implements ISubCategoryRepository {
  @inject(ContainerTypes.SubCategoryRepositoryBase)
  private repositoryBase!: IRepositoryBase<ISubCategoryEntity>;

  async createSubCategory(
    subCategory: ISubCategoryEntity
  ): Promise<ISubCategoryEntity> {
    return this.repositoryBase.create(subCategory);
  }
  async getSubCategory(
    subCategory: any,
    populate: string
  ): Promise<ISubCategoryEntity> {
    return this.repositoryBase.findOne(subCategory, populate);
  }
  async getAllSubCategories(filterType: any): Promise<ISubCategoryEntity[]> {
    return this.repositoryBase.find(filterType);
  }
  async updateSubCategory(
    id: string,
    subCategory: ISubCategoryEntity
  ): Promise<ISubCategoryEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      subCategory
    )) as ISubCategoryEntity;
  }
  async deleteSubCategory(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterSubCategory(
    filterCriteria: Object,
    filterType: string,
    pageSize?: number,
    page?: number
  ): Promise<ISubCategoryEntity[]> {
    let filter = buildFilterObjectForSubCategory(filterType, filterCriteria);
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

  createSubCategories(
    subCategories: ISubCategoryEntity[]
  ): Promise<ISubCategoryEntity[]> {
    return this.repositoryBase.bulkInsert(subCategories);
  }

  updateSubCategories(subCategories: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(subCategories);
  }

  async updateManySubCategory(
    updateQuery: object,
    updateData: ISubCategoryEntity
  ): Promise<void> {
    let filter = buildFilterObjectForSubCategory("", updateQuery);
    if (updateData?.deleteFlag) {
      return this.repositoryBase.bulkDelete(filter?.filter);
    } else {
      return this.repositoryBase.updateMany(filter?.filter, updateData);
    }
  }

  filterSubCatagoryByPagination(
    filterCriteria: Object,
    filterType: string,
    pageSize?: number,
    page?: number,
  ): Promise<any> {
    let filter = buildFilterObjectForSubCategory(filterType, filterCriteria);
    return this.repositoryBase.count(filter?.filter);
  }

}
export default SubCategoryRepository;
