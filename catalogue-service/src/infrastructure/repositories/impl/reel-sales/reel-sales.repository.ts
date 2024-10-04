import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IReelSalesRepository } from "../../contracts/reel-sales/i-reel-sales.repository";
import { IReelSalesEntity } from "../../entities/reel-sales/reel-sales.entity";
import { buildFilterObjectForGlobalCatalogues } from "../../helpers/global-catalogues-filter.helper";
import { buildRequestReelSales } from "../../helpers/reel-sales-filter.helper";
import { Types } from "mongoose";

@injectable()
export class ReelSalesRepository implements IReelSalesRepository {
  @inject(ContainerTypes.ReelSalesRepositoryBase)
  private ReelSalesRepositoryBase!: IRepositoryBase<IReelSalesEntity>;
  async createReelSales(data: any): Promise<any> {
    return this.ReelSalesRepositoryBase.create(data);
  }
  async getReelSales(
    filterCriteria: any,
    filterType: any,
    pageSize: any,
    page: any
  ): Promise<any> {
    return this.ReelSalesRepositoryBase.filter(
      filterCriteria,
      "",
      "",
      "",
      pageSize,
      page,
      ""
    );
  }
  async getReelSalesById(id: any): Promise<any> {
    return this.ReelSalesRepositoryBase.findById(id);
  }
  async updateReelSales(id: any, data: any): Promise<any> {
    return this.ReelSalesRepositoryBase.update(new Types.ObjectId(id), data);
  }
  async deleteReelSales(ids: any): Promise<any> {
    return await this.ReelSalesRepositoryBase.delete(new Types.ObjectId(ids));
  }
  async filterReelSales(
    filterCriteria: any,
    filterType: any,
    pageSize: any,
    page: any,
    sort: any
  ): Promise<any> {
    let filter: any = buildRequestReelSales(
      filterCriteria,
      filterType,
      pageSize,
      page,
      sort
    );
    let data = await this.ReelSalesRepositoryBase.filter(
      filter?.filter ? filter.filter : {},
      filter?.fields,
      filter?.populate,
      filter?.aggregate,
      pageSize,
      page,
      filter?.sort
    );
    return data;
  }
  async updateByAction(id: any, data: any): Promise<any> {
    return await this.ReelSalesRepositoryBase.update(
      new Types.ObjectId(id),
      data
    );
  }
  async filterByPagination(
    filterCriteria?: any,
    pageSize?: number,
    page?: number
  ): Promise<any> {
    return await this.ReelSalesRepositoryBase.count(filterCriteria);
  }
}
