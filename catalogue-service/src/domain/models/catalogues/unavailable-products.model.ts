import { Exclude, Expose, Transform, Type } from "class-transformer";
import "reflect-metadata";
import { ExposeId } from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";

@Exclude()
export class UnavailableProductModel extends BaseModel {
  @Expose()
  @ExposeId()
  businessUnitId?: string;
  @Expose()
  @ExposeId()
  globalCatalogueId?: string;
  @Expose()
  @ExposeId()
  productId?: string;
  @Expose()
  erpId?: string;
  @Expose()
  erpSource?: string;
  @Expose()
  barcode?: string;
  @Expose()
  itemCode?: string;
  @Expose()
  message?: string;
  @Expose()
  creationDate?: string;
}
