import "reflect-metadata";
import { Exclude, Expose, Type } from "class-transformer";
import { BaseModel } from "../base.model";
import { ProductExemptionValueModel } from "./product-exemption-value.model";

@Exclude()
export class ProductExemptionModel extends BaseModel {
  @Expose()
  exemptionsType!: string;
  @Expose()
  @Type(() => ProductExemptionValueModel)
  exemptionsValue!: ProductExemptionValueModel;
  @Expose()
  conditionAllowed!: boolean;
  @Expose()
  offeringAllowed!: boolean;
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
