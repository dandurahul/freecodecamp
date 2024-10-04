import { Exclude, Expose, Transform, Type } from "class-transformer";
import "reflect-metadata";
import {
  ExposeId,
  customTransform,
} from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";
import { MediaTypeModel } from "../media-type.model";
import { SeoModel } from "../seo.model";

@Exclude()
export class HighlightModel extends BaseModel {
  @Expose()
  @ExposeId()
  businessUnitId!: string | undefined;
  @Expose()
  productHighlightCode!: string | undefined;
  @Expose()
  productHighlight!: string | undefined;
  @Expose()
  description!: string | undefined;
  @Transform(({ value }) => {
    if (typeof value === "object" && Object.keys(value).length === 0) {
      return undefined;
    }
    return value;
  })
  @Expose()
  @ExposeId()
  @Type(() => MediaTypeModel)
  webBanner!: MediaTypeModel | undefined;
  @Transform(({ value }) => {
    if (typeof value === "object" && Object.keys(value).length === 0) {
      return undefined;
    }
    return value;
  })
  @Expose()
  @ExposeId()
  @Type(() => MediaTypeModel)
  mobileBanner!: MediaTypeModel | undefined;
  @Transform(({ value }) => {
    if (typeof value === "object" && Object.keys(value).length === 0) {
      return undefined;
    }
    return value;
  })
  @Expose()
  @Type(() => SeoModel)
  seo!: SeoModel | undefined;
  @Expose()
  productCount!: string | undefined;
  @Expose()
  storeProductCount!: string | undefined;
  @Expose()
  syncHighlight!: boolean;
  @Expose()
  activeFlag!: boolean | undefined;
  @Expose()
  deleteFlag!: boolean | undefined;
  @Expose()
  createdBy!: string | undefined;
  @Expose()
  creationDate!: Date | undefined;
  @Expose()
  modifiedBy!: string | undefined;
  @Expose()
  modifiedDate!: Date | undefined;
}
