import { IReservedQuantityEntity } from "../reserved/reserved-quantity.entity";
export interface ReservedQuantityBulkEntity {
  orderId: string | undefined;
  status: string | undefined;
  data: IReservedQuantityEntity[];
}
