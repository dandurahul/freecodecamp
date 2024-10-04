import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { ExposeId } from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";
import { StoreCatalogueDetailsModel } from "./store-catalogue-details.model";
import { CatalogueFilterInfoModel } from "./store-products-info.model";

@Exclude()
export class AdvancedCatalogueFilterModel extends BaseModel {
  @Expose()
  @ExposeId()
  @Type(() => CatalogueFilterInfoModel)
  storeProductInfo!: CatalogueFilterInfoModel;
  @Expose()
  @ExposeId()
  breadCrumb?: [];
  @Expose()
  @ExposeId()
  categories?: [];
  @Expose()
  @ExposeId()
  subCategories?: [];
  @Expose()
  @ExposeId()
  classifications?: [];
}
