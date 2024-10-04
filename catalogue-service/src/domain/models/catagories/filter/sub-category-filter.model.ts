import { Exclude, Expose } from "class-transformer";
import { BaseModel } from "../../base.model";
import { ExposeId } from "../../../../application/utils/custom-transform";

@Exclude()
export class SubCategoryFilterModel extends BaseModel {
  @Expose()
  id?: string;
  @Expose()
  subCategoryIds?: string[];
  deleteFlag?: boolean;
  @Expose()
  activeFlag?: boolean;
  @Expose()
  categoryId?: string;
  @Expose()
  @ExposeId()
  businessUnitId?: string;
}
