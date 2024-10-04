import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { ExposeId } from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";

@Exclude()
export class StoreModel {
  @Expose()
  @ExposeId()
  entityInternalId?: string;
  @Expose()
  stockBalance?: number;
  @Expose()
  StockType?: boolean;
}

@Exclude()
export class CatalogueStockModel extends BaseModel {
  @Expose()
  @ExposeId()
  productId?: string;
  @Expose()
  @ExposeId()
  businessUnitId?: string;
  @Expose()
  itemCode?: string;
  @Expose()
  stores?: StoreModel;
  @Expose()
  totalStock?: number;
}
