import { Exclude, Expose } from "class-transformer";
import { BaseModel } from "../../base.model";
import { ExposeId } from "../../../../application/utils/custom-transform";

@Exclude()
export class HighlightFilterModel extends BaseModel {
  @Expose()
  highlightId!: string;
  @Expose()
  productId!: string;
  @Expose()
  productIds!: string[];
  @Expose()
  storeProductId!: string;
  @Expose()
  entityInternalIds!: string;
  @Expose()
  businessUnitId!: string;
}
