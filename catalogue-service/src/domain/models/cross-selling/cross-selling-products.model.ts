import "reflect-metadata";
import { Exclude, Expose, Type } from "class-transformer";
import { BaseModel } from "../base.model";
import { ExposeId } from "../../../application/utils/custom-transform";

@Exclude()
export class CrossSellingProductsModel extends BaseModel {
  @Expose()
  @ExposeId()
  productId!: string;
  @Expose()
  @ExposeId()
  businessUnitId!: string;
  @Expose()
  @ExposeId()
  crossSellingProducts!: string[];
  @Expose()
  activeFlag!: boolean;
  @Expose()
  deleteFlag!: boolean;
  @Expose()
  createdBy!: string;
  @Expose()
  creationDate!: Date;
  @Expose()
  modifiedBy!: string;
  @Expose()
  modifiedDate!: Date;
}
