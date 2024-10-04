import { Exclude, Expose } from "class-transformer";
import { BaseModel } from "../../base.model";

@Exclude()
export class CategoryFilterModel extends BaseModel {
  @Expose()
  categoryIds!: string[];
}
