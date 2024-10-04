import { Exclude, Expose } from "class-transformer";
import { BaseModel } from "../../base.model";

@Exclude()
export class CrossSellingProductsFilterModel extends BaseModel {
  @Expose()
  productId!: string;
}
