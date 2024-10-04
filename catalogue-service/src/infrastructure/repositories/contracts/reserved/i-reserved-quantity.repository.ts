import { IReservedQuantityEntity } from '../../entities/reserved/reserved-quantity.entity';

export interface IReservedQuantityRepository {
  createReservedQuantity(
    reservedQuantityEntity: IReservedQuantityEntity
  ): Promise<IReservedQuantityEntity>;
  bulkInsert(
    reservedQuantityEntity: IReservedQuantityEntity[]
  ): Promise<IReservedQuantityEntity[]>;
  getReservedQuantity(query: any): Promise<IReservedQuantityEntity>;
  getAllReservedQuantityDetails(query: any): Promise<IReservedQuantityEntity[]>;
  updateReservedQuantity(
    id: string,
    reservedQuantity: IReservedQuantityEntity
  ): Promise<IReservedQuantityEntity>;
  deleteReservedQuantity(id: string): Promise<void>;
  filterReservedQuantity(
    query: Object,
    pageSize?: number,
    page?: number,
    sort?: string
  ): Promise<IReservedQuantityEntity[]>;
  bulkWrite(reservedQuantity: IReservedQuantityEntity[]): Promise<void>;
  bulkDelete(reservedQuantity: Object): Promise<any>;
  updateMany(
    query: any,
    reservedQuantity: IReservedQuantityEntity
  ): Promise<IReservedQuantityEntity>;
  getReservedQuantityGroupByProduct(query: any): Promise<IReservedQuantityEntity[]>

}
