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
export class CategoryModel extends BaseModel {
  @Expose()
  @ExposeId()
  businessUnitId!: string;
  @Expose()
  categoryName!: string;
  @Expose()
  productCount!: number;
  @Expose()
  subcategoryCount!: number;
  @Expose()
  description!: string;
  @Expose()
  @ExposeId()
  @Type(() => MediaTypeModel)
  webMedia!: MediaTypeModel;

  @Expose()
  @ExposeId()
  @Type(() => MediaTypeModel)
  mobileMedia!: MediaTypeModel;

  @Expose()
  @ExposeId()
  @Type(() => MediaTypeModel)
  posMedia!: MediaTypeModel;

  @Expose()
  toolTip!: string;
  @Expose()
  orderValue!: number;
  @Expose()
  productAllowed!: boolean;
  @Type(() => SeoModel)
  @Expose()
  @ExposeId()
  @Type(() => SeoModel)
  seo!: SeoModel;
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
  @Expose()
  sizeChartId!: string;
}
