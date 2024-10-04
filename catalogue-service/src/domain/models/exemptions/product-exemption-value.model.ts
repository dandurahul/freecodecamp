import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import { Types } from "mongoose";
import { ExposeId } from "../../../application/utils/custom-transform";

@Exclude()
export class ProductExemptionValueModel  {
  @Expose()
  dataType!: string;
  @Expose()
  @ExposeId()
  datavalue!: Types.ObjectId;
  @Expose()
  indexValue!: string;
}
