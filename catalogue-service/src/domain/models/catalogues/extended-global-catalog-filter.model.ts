import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";

@Exclude()
export class ExtendedGlobalCatalogFilterModel extends BaseModel {
  @Expose()
  productIds?: string[];
  @Expose()
  categoryId?: string;
  @Expose()
  subCategoryId?: boolean;
  @Expose()
  classificationId?: string;
  @Expose()
  globalCatalogue?: string;
}
