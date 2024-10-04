import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IProductExemptionRepository } from "../../contracts/exemptions/i-product-exemption.repository";
import { IProductExemptionEntity } from "../../entities/exemptions/product-exemptions.entity";
import { populate } from "dotenv";
import { buildRequestObjectForProductExemptions } from "../../helpers/product-exemptions-filter.helper";
import { ProductExemptionFilterEntity } from "../../entities/filter/product-exmptions-filter.entity";
import { FilterConstants } from "../../../../application/constants/filter.constants";

@injectable()
class ProductExemptionRepository implements IProductExemptionRepository {
  @inject(ContainerTypes.ProductExemptionsRepositoryBase)
  private repositoryBase!: IRepositoryBase<IProductExemptionEntity>;

  async createProductExemption(
    exemption: IProductExemptionEntity
  ): Promise<IProductExemptionEntity> {
    return this.repositoryBase.create(exemption);
  }

  async getProductExemptionById(
    query: any,
    populate: string
  ): Promise<IProductExemptionEntity> {
    return this.repositoryBase.findOne(query, populate);
  }
  async getAllProductExemptions(
    filterType: string | undefined,
    activeFlag: string
  ): Promise<IProductExemptionEntity[]> {
    let query =
      activeFlag === FilterConstants.active
        ? { deleteFlag: false, activeFlag: true, exemptionsType: filterType }
        : { deleteFlag: false, exemptionsType: filterType };
    return this.repositoryBase.find(query);
  }
  async updateProductExemption(
    id: string,
    exemption: IProductExemptionEntity
  ): Promise<IProductExemptionEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      exemption
    )) as IProductExemptionEntity;
  }
  async deleteProductExemption(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterProductExemptions(
    query: ProductExemptionFilterEntity,
    fields?: string,
    filterType?: string | undefined,
    aggregate?: string,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IProductExemptionEntity[]> {
    let filter = buildRequestObjectForProductExemptions(query, filterType);
    return this.repositoryBase.filter(
      filter?.query,
      fields,
      "",
      filter?.aggregate,
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
export default ProductExemptionRepository;
