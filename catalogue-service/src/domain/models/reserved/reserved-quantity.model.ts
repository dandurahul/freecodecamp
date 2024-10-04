import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import { ExposeId } from "../../../application/utils/custom-transform";

@Exclude()
export class ReserveQuantityModel extends BaseModel {
  @ExposeId()
  @Expose()
  entityInternalId!: string | undefined;
  @ExposeId()
  @Expose()
  orderGenId!: string | undefined;
  @ExposeId()
  @Expose()
  orderId!: string | undefined;
  @Expose()
  storeOrderId!: string | undefined;
  @ExposeId()
  @Expose()
  productId!: string | undefined;
  @ExposeId()
  @Expose()
  storeProductId!: string | undefined;
  @Expose()
  variantIndex!: number | undefined;
  @Expose()
  reservedQuantity!: number | undefined;
  @Expose()
  lastUpdatedQuantity!: number | undefined;
  @Expose()
  alternateQuantity!: number | undefined;
  @Expose()
  orderedDate!: Date | undefined;
  @Expose()
  orderStatus!: string | undefined;
  @Expose()
  status!: string | undefined;
  @Expose()
  isAccepted!: boolean | undefined;
  @Expose()
  isPickingCompleted!: boolean | undefined;
  @Expose()
  removedProduct!: boolean | undefined;
  @Expose()
  activeFlag!: boolean | undefined;
  @Expose()
  deleteFlag!: boolean | undefined;
  @Expose()
  createdBy!: string | undefined;
  @Expose()
  creationDate!: Date | undefined;
  @Expose()
  modifiedBy!: string | undefined;
  @Expose()
  modifiedDate!: Date | undefined;
}
