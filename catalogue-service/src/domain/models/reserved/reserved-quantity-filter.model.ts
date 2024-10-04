import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";

@Exclude()
export class ReserveQuantityFilterModel extends BaseModel {
  @Expose()
  orderIds?: string[];
  @Expose()
  status?: string;
  @Expose()
  entityInternalId?: boolean;
  @Expose()
  orderId?: string;
  @Expose()
  orderGenId?: string;
  @Expose()
  storeProductId?: string;
  @Expose()
  productIds?: string[];
  @Expose()
  productId?: string;
}
