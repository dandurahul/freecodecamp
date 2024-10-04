import { Exclude, Expose, Transform, Type } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import {
  ExposeId,
  TransformProperties,
  customTransform,
} from "../../../application/utils/custom-transform";
import { MediaTypeModel } from "../media-type.model";
import { SeoModel } from "../seo.model";

@Exclude()
export class ClassificationModel extends BaseModel {
  @Expose()
  @ExposeId()
  businessUnitId!: string;
  @Expose()
  @ExposeId()
  categoryId!: string;
  @Expose()
  description!: string;
  @Expose()
  @ExposeId()
  subCategoryId!: string;
  @Expose()
  classificationName!: string;
  @TransformProperties("categoryId", "categoryName")
  @Expose()
  categoryName!: string;
  @TransformProperties("subCategoryId", "subCategoryName")
  @Expose()
  subCategoryName!: string;
  @TransformProperties("webMedia", "media")
  @Expose()
  images!: string;
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
  @Type(() => SeoModel)
  seo!: SeoModel;
  @Expose()
  productCount!: number;
  @Expose()
  secondarySubCategory!: string[];
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
