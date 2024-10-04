import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import { ExposeId } from "../../../application/utils/custom-transform";

@Exclude()
export class StoreCataloguePurchaseVariantModel extends BaseModel {
  @Expose()
  index!: number;
  @Expose()
  purchaseType!: string;
  @Expose()
  @ExposeId()
  variantId!: number;
  @Expose()
  @ExposeId()
  productId!: string;
  @Expose()
  @ExposeId()
  entityInternalId!: string;
  @Expose()
  purchaseConversion!: number;
}
