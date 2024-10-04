import { Expose, Transform } from "class-transformer";
import {
  ExposeId,
  customTransform,
} from "../../application/utils/custom-transform";

export class BaseModel {
  @Expose()
  @ExposeId()
  id?: string | undefined;
  @Expose()
  @ExposeId()
  _id?: string | undefined;
}
