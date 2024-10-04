import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import {
  ExposeId,
  TransformProperties,
} from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";
import { MediaTypeModel } from "../media-type.model";
import { SeoModel } from "../seo.model";

@Exclude()
export class SubCategoryModel extends BaseModel {
  @Expose()
  @ExposeId()
  businessUnitId!: string;
  @Expose()
  @ExposeId()
  @TransformProperties("categoryId", "_id")
  categoryId!: string;
  @Expose()
  @TransformProperties("categoryId", "categoryName")
  categoryName!: string;
  @Expose()
  @ExposeId()
  secondaryCategory!: string[];
  @Expose()
  subCategoryName!: string;
  @Expose()
  description!: string;
  @Expose()
  productCount!: number;
  @Expose()
  subcategoryCount!: number;
  @Expose()
  @ExposeId()
  @Type(() => MediaTypeModel)
  images!: MediaTypeModel;
  @Expose()
  @ExposeId()
  @Type(() => MediaTypeModel)
  webMedia!: MediaTypeModel | undefined;
  @Expose()
  @ExposeId()
  @Type(() => MediaTypeModel)
  mobileMedia!: MediaTypeModel | undefined;
  @Expose()
  @ExposeId()
  @Type(() => MediaTypeModel)
  posMedia!: MediaTypeModel | undefined;
  @Expose()
  toolTip!: string;
  @Expose()
  productAllowed!: boolean;
  @Expose()
  @ExposeId()
  @Type(() => SeoModel)
  seo!: SeoModel | undefined;
  @Expose()
  orderValue!: number;
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
