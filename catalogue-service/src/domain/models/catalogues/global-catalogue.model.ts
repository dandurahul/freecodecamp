import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { ExposeId } from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";
import { SeoModel } from "../seo.model";
import { GlobalCatalogueVariantModel } from "./global-catalogue-variants.model";
import { GlobalCataloguePurchaseVariantModel } from "./global-catalogue-purchase-variants.model";
import { CategoryModel } from "../catagories/category.model";

@Exclude()
export class GlobalCatalogueModel extends BaseModel {
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
  category!: string;
  @Expose()
  @ExposeId()
  subCategory!: string;
  @Expose()
  @ExposeId()
  classification!: string;
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
}
