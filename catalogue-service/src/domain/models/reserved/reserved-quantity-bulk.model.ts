import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import { ReserveQuantityModel } from "./reserved-quantity.model";
import { ExposeId } from "../../../application/utils/custom-transform";

@Exclude()
export class BulkReserveQuantityModel extends BaseModel {
  @ExposeId()
  @Expose()
  orderId!: string;
  @Expose()
  status!: string;
  @Expose()
  @Type(() => ReserveQuantityModel)
  data!: ReserveQuantityModel;
}