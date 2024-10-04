import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { buildRequestForForCrossSellingProducts } from "../../helpers/cross-selling-products.helper";
import { ICrossSellingProductsEntity } from "../../entities/cross-selling/cross-selling-products.entity";
import { ICrossSellingProductsRepository } from "../../contracts/cross-selling/i-cross-selling-products.repository";
import { CrossSellingProductsFilterEntity } from "../../entities/filter/cross-selling-products-filter.entity";

@injectable()
class CrossSellingProductsRepository
  implements ICrossSellingProductsRepository
{
  @inject(ContainerTypes.CrossSellingProductsRepositoryBase)
  private repositoryBase!: IRepositoryBase<ICrossSellingProductsEntity>;

  async createCrossSellingProduct(
    crossSelling: ICrossSellingProductsEntity
  ): Promise<ICrossSellingProductsEntity> {
    return this.repositoryBase.create(crossSelling);
  }

  async getCrossSellingProductById(
    query: any,
    populate: string
  ): Promise<ICrossSellingProductsEntity> {
    return this.repositoryBase.findOne(query, populate);
  }
  async getAllCrossSellingProducts(
    filterType: any
  ): Promise<ICrossSellingProductsEntity[]> {
    return this.repositoryBase.find({ deleteFlag: false });
  }
  async updateCrossSellingProduct(
    id: string,
    crossSelling: ICrossSellingProductsEntity
  ): Promise<ICrossSellingProductsEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      crossSelling
    )) as ICrossSellingProductsEntity;
  }
  async deleteCrossSellingProduct(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterCrossSellingProducts(
    query: CrossSellingProductsFilterEntity,
    fields?: string,
    populate?: string,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<ICrossSellingProductsEntity[]> {
    query = buildRequestForForCrossSellingProducts(query) as any;
    return this.repositoryBase.filter(
      query,
      fields,
      populate,
      aggregate,
      pageSize,
      page,
      sort
    );
  }

  bulkWrite(data: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(data);
  }

  filterByPagination(
    data: any[],
    page: number,
    pageSize: number
  ): Promise<any> {
    return this.repositoryBase.count(data);
  }
}
export default CrossSellingProductsRepository;
