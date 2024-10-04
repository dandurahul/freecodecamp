import { Exclude, Expose, Transform } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import {
  ExposeId,
  TransformProperties,
} from "../../../application/utils/custom-transform";
import { GlobalCatalogueDetailsModel } from "./global-catalogue-details.model";
import { CategoryModel } from "../catagories/category.model";
import { SubCategoryModel } from "../catagories/sub-category.model";
import { ClassificationModel } from "../catagories/classification.model";

@Exclude()
export class ExtendedGlobalCatalogModel extends BaseModel {
  @ExposeId()
  @Expose()
  productId!: string;

  @Expose()
  @ExposeId()
  globalCatalogue?: GlobalCatalogueDetailsModel;
  @Expose()
  @ExposeId()
  categoryId?: CategoryModel;

  @TransformProperties("categoryId", "categoryName")
  @Expose()
  categoryName!: string;

  @TransformProperties("subCategoryId", "subCategoryName")
  @Expose()
  subCategoryName!: string;

  @Expose()
  @ExposeId()
  subCategoryId?: SubCategoryModel;

  @TransformProperties("classificationId", "classificationName")
  @Expose()
  classificationName!: string;

  @Expose()
  @ExposeId()
  classificationId?: ClassificationModel;
  @ExposeId()
  @Expose()
  secondaryCategory?: CategoryModel;


  @Expose()
  @Transform(( {obj} ) => {
    return obj.secondaryCategory?.map((e: any) => e.categoryName);
  })
  categories?: CategoryModel;

  @ExposeId()
  @Expose()
  secondarySubCategory?: SubCategoryModel;

  @Expose()
  @Transform(({ obj }) => {
    return obj.secondarySubCategory?.map((e: any) => e.subCategoryName);
  })
  subCategories?: SubCategoryModel;

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
