import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { ReelSalesModel } from "../../../domain/reel-sales/reel-sales.model";
import { TransformOptions } from "../../constants/transform-options";
import { plainToInstance } from "class-transformer";
import { IReelSalesService } from "../../contracts/reel-sales/i-reel-sales.service";
import { IReelSalesRepository } from "../../../infrastructure/repositories/contracts/reel-sales/i-reel-sales.repository";
import {
  buildPaginationObject,
  getFilterByAction,
} from "../../../infrastructure/repositories/helpers/reel-sales-filter.helper";
import Seo from "../../../infrastructure/repositories/entities/iseo.entity";
@injectable()
export class ReelSalesService implements IReelSalesService {
  @inject(ContainerTypes.ReelSalesRepository)
  private reelSalesRepository!: IReelSalesRepository;

  async createReelSales(data: any): Promise<ReelSalesModel[]> {
    if(data.seo) data.seo = (await Seo.create(data.seo))._id
    const videoReels: any = await this.reelSalesRepository.createReelSales(
      data
    );
    return plainToInstance(
      ReelSalesModel,
      videoReels,
      TransformOptions.tranformOptions
    );
  }
  async getReelSales(
    filterCriteria: any,
    filterType: any,
    pageSize: any,
    page: any
  ): Promise<ReelSalesModel[]> {
    return plainToInstance(
      ReelSalesModel,
      await this.reelSalesRepository.getReelSales(
        filterCriteria,
        filterType,
        pageSize,
        page
      ),
      TransformOptions.tranformOptions
    );
  }
  async getReelSalesById(id: any): Promise<any> {
    return plainToInstance(
      ReelSalesModel,
      await this.reelSalesRepository.getReelSalesById(id),
      TransformOptions.tranformOptions
    );
  }
  async deleteReelSales(ids: any): Promise<any> {
    return plainToInstance(
      ReelSalesModel,
      await this.reelSalesRepository.deleteReelSales(ids),
      TransformOptions.tranformOptions
    );
  }
  async filterByPagination(
    filterCriteria: any,
    pageSize: number,
    page: number
  ): Promise<any> {
    let count = await this.reelSalesRepository.filterByPagination(
      filterCriteria,
      pageSize,
      page
    );
    return buildPaginationObject(count, pageSize);
  }
  async updateReelSales(id: any, data: any): Promise<any> {
    return await this.reelSalesRepository.updateReelSales(id, data);
  }
  async filterReelSales(
    filterCriteria: any,
    filterType: any,
    pageSize: any,
    page: any,
    sort: any
  ): Promise<any> {
    return await this.reelSalesRepository.filterReelSales(
      filterCriteria,
      filterType,
      pageSize,
      page,
      sort
    );
  }
  async updateByAction(id: any, action: any): Promise<any> {
    return await this.reelSalesRepository.updateByAction(
      id,
      await getFilterByAction(action)
    );
  }
}
