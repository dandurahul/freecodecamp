import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IReservedQuantityRepository } from "../../contracts/reserved/i-reserved-quantity.repository";
import { IReservedQuantityEntity } from "../../entities/reserved/reserved-quantity.entity";
import { buildRequestForForReservedQuantity } from "../../helpers/reserved-quantity.helper";
import { ReserveQuantityFilterModel } from "../../../../domain/models/reserved/reserved-quantity-filter.model";
import { FilterConstants } from "../../../../application/constants/filter.constants";

@injectable()
class ReservedQuantityRepository implements IReservedQuantityRepository {
  @inject(ContainerTypes.ReservedQuantityRepositoryBase)
  private repositoryBase!: IRepositoryBase<IReservedQuantityEntity>;

  async createReservedQuantity(
    reservedQuantity: IReservedQuantityEntity
  ): Promise<IReservedQuantityEntity> {
    return this.repositoryBase.create(reservedQuantity);
  }

  async getReservedQuantity(query: any): Promise<IReservedQuantityEntity> {
    return this.repositoryBase.findOne(query, "");
  }
  async getAllReservedQuantityDetails(
    query: any
  ): Promise<IReservedQuantityEntity[]> {
    return this.repositoryBase.find(query);
  }
  async updateReservedQuantity(
    id: string,
    reservedQuantity: IReservedQuantityEntity
  ): Promise<IReservedQuantityEntity> {
    return (await this.repositoryBase.update(
      new mongoose.Types.ObjectId(id),
      reservedQuantity
    )) as IReservedQuantityEntity;
  }
  async deleteReservedQuantity(id: string): Promise<void> {
    return this.repositoryBase.delete(id);
  }
  async filterReservedQuantity(
    query: ReserveQuantityFilterModel,
    pageSize: number,
    page: number,
    sort: string
  ): Promise<IReservedQuantityEntity[]> {
    query = buildRequestForForReservedQuantity(query) as any;
    return this.repositoryBase.filter(
      query,
      "",
      "",
      undefined,
      pageSize,
      page,
      sort
    );
  }

  async getReservedQuantityGroupByProduct(
    query: any
  ): Promise<IReservedQuantityEntity[]> {
    query = buildRequestForForReservedQuantity(query) as any;

    let aggregate = [
      {
        $addFields: {
          entityInternalId: { $toString: "$entityInternalId" },
        },
      },
      {
        $match: { ...query, status: FilterConstants.ACTIVE },
      },
      {
        $group: {
          _id: "$productId",
          reservedQuantity: { $sum: "$reservedQuantity" },
        },
      },
    ];

    return this.repositoryBase.filter("", "", "", aggregate);
  }

  bulkInsert(
    reservedQuantity: IReservedQuantityEntity[]
  ): Promise<IReservedQuantityEntity[]> {
    return this.repositoryBase.bulkInsert(reservedQuantity);
  }

  bulkWrite(data: any[]): Promise<any> {
    return this.repositoryBase.bulkWrite(data);
  }

  bulkDelete(data: any[]): Promise<any> {
    return this.repositoryBase.bulkDelete(data);
  }

  async updateMany(
    query: any,
    reserved: IReservedQuantityEntity
  ): Promise<IReservedQuantityEntity> {
    return (await this.repositoryBase.updateMany(
      query,
      reserved
    )) as IReservedQuantityEntity;
  }
}
export default ReservedQuantityRepository;
