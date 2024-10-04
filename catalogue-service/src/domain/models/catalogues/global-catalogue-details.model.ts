import { Exclude, Expose, Transform, Type } from "class-transformer";
import "reflect-metadata";
import { ExposeId } from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";
import { SeoModel } from "../seo.model";
import { GlobalCatalogueVariantModel } from "./global-catalogue-variants.model";
import { GlobalCataloguePurchaseVariantModel } from "./global-catalogue-purchase-variants.model";
import { CategoryModel } from "../catagories/category.model";
import { SubCategoryModel } from "../catagories/sub-category.model";
import { ClassificationModel } from "../catagories/classification.model";

@Exclude()
export class GlobalCatalogueDetailsModel extends BaseModel {
  @Expose()
  @ExposeId()
  businessUnitId!: string;
  @Expose()
  @ExposeId()
  productId!: string;
  @Expose()
  source!: string;
  @Expose()
  @ExposeId()
  @Type(() => CategoryModel)
  category!: CategoryModel;
  @Expose()
  @ExposeId()
  @Type(() => SubCategoryModel)
  subCategory!: SubCategoryModel;
  @Expose()
  @ExposeId()
  @Type(() => ClassificationModel)
  classification!: ClassificationModel;
  @Expose()
  variantsCount!: number;
  @Expose()
  orderValue!: number;
  @Expose()
  @ExposeId()
  highlights!: string[];
  @Expose()
  @ExposeId()
  @Type(() => GlobalCatalogueVariantModel)
  variants!: GlobalCatalogueVariantModel[];
  @Expose()
  @ExposeId()
  @Type(() => GlobalCataloguePurchaseVariantModel)
  purchaseVariants!: GlobalCataloguePurchaseVariantModel[];
  @Expose()
  @Type(() => SeoModel)
  seo!: SeoModel;
}
