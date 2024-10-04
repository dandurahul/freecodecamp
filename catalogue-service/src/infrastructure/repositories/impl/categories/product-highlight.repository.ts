import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IProductHighlightRepository } from "../../contracts/catagories/i-product-highlight.repository";
import { IProductHighlightEntity } from "../../entities/categories/product-highlight.entity";
import {
  buildFilterObjectForHighlight,
  getFilterForWebList,
} from "../../helpers/highlight-filter.helper";

@injectable()
class ProductHighlightRepository implements IProductHighlightRepository {
  @inject(ContainerTypes.ProductHighlightRepositoryBase)
  private repositoryBase!: IRepositoryBase<IProductHighlightEntity>;

  async createProductHighlight(
    highlight: IProductHighlightEntity
  ): Promise<IProductHighlightEntity> {
    return this.repositoryBase.create(highlight);
  }

  async getProductHighlight(id: any): Promise<IProductHighlightEntity> {
    let filter = getFilterForWebList("");
    return this.repositoryBase.findOne({ _id: id }, filter?.populate);
  }

  async getAllHighlights(query: any): Promise<IProductHighlightEntity[]> {
    return this.repositoryBase.find(query);
  }

  async updateProductHighlight(
    id: string,
    highlight: IProductHighlightEntity
  ): Promise<IProductHighlightEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      highlight
    )) as IProductHighlightEntity;
  }

  async deleteProductHighlight(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }

  async filterProductHighlight(
    filterCriteria: object,
    filterType: string,
    pageSize?: number,
    page?: number
  ): Promise<IProductHighlightEntity[]> {
    let filter = buildFilterObjectForHighlight(filterType, filterCriteria);
    
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

  createProductHighlights(
    highlights: IProductHighlightEntity[]
  ): Promise<IProductHighlightEntity[]> {
    return this.repositoryBase.bulkInsert(highlights);
  }

  updateProductHighlights(highlights: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(highlights);
  }

  async updateManyProductHighlights(
    updateQuery: object,
    updateData: IProductHighlightEntity
  ): Promise<void> {
    let filter = buildFilterObjectForHighlight("", updateQuery);
    return this.repositoryBase.updateMany(filter?.filter, updateData);
  }

  paginationByFilter(filterCriteria: any): Promise<any> {
    let filter = buildFilterObjectForHighlight("", filterCriteria);
    return this.repositoryBase.count(filter?.filter);
  }
}
export default ProductHighlightRepository;
