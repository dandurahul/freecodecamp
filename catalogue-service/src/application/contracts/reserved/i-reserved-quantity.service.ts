import { ReserveQuantityModel } from "../../../domain/models/reserved/reserved-quantity.model";

export interface IReservedQuantityService {
  createReservedQuantity(
    reservedQuantity: ReserveQuantityModel
  ): Promise<ReserveQuantityModel>;

  getReservedQuantityById(_id: string): Promise<ReserveQuantityModel>;
  getAllReservedQuantityDetails(
    filterCriteria: Object,
    filterType: string
  ): Promise<ReserveQuantityModel[]>;
  updateReservedQuantity(
    _id: string,
    reservedQuantity: ReserveQuantityModel
  ): Promise<ReserveQuantityModel>;
  deleteReservedQuantity(id: string): Promise<void>;
  filterReservedQuantity(
    filterCriteria: Object,
    pageSize: number,
    page: number,
    filterType: string | undefined
  ): Promise<ReserveQuantityModel[]>;
  updateReservedQuantityWithStockDetails(
    filterCriteria: Object,
    filterType: string | undefined
  ): Promise<ReserveQuantityModel[]>;
}
