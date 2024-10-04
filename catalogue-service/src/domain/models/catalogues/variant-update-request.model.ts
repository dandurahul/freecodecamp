import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { ExposeId } from "../../../application/utils/custom-transform";

@Exclude()
export class VariantRequestModel {
  @Expose()
  type?: string;
  @Expose()
  storeCode?: string;
  @Expose()
  @ExposeId()
  entityInternalId?: string;
  @Expose()
  @ExposeId()
  productId?: string;
  @Expose()
  productVariantIndex?: number;
  @Expose()
  stockBalance?: number;
  @Expose()
  price?: number;
}
