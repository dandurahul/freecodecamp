import { Exclude, Expose } from "class-transformer";
import { BaseModel } from "../../base.model";
import { ExposeId } from "../../../../application/utils/custom-transform";

@Exclude()
export class ClassificationFilterModel {
  @Expose()
  classificationIds!: string[];
  @Expose()
  @ExposeId()
  businessUnitId!: string;
}
