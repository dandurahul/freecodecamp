import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";

@Exclude()
export class ProductExemptionFilterModel extends BaseModel {
  @Expose()
  exemptionsType!: string;
  @Expose()
  conditionAllowed!: boolean;
  @Expose()
  offeringAllowed!: boolean;
  @Expose()
  productIds!: string[];
}
