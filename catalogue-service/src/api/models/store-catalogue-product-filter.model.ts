import "reflect-metadata";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class StoreCatalogueFilterModel {
  @Expose()
  ids?: string[];
  @Expose()
  categoryId?: string | undefined;
  @Expose()
  entityInternalId?: string | undefined;
  @Expose()
  productIds?: string[];
  @Expose()
  categoryIds?: string[];
  @Expose()
  subCategoryId?: string | undefined;
  @Expose()
  subCategoryIds?: string[];
  @Expose()
  classificationId?: string | undefined;
  @Expose()
  classificationIds?: string[];
  @Expose()
  highlightId?: string | undefined;
  @Expose()
  highlightIds?: string[];
  @Expose()
  activeFlag?: boolean;
  @Expose()
  priceRange?: Object;
  @Expose()
  breadCrumb?: [Object];
  @Expose()
  deleteFlag?: boolean;
  @Expose()
  page?: number;
  @Expose()
  pageSize?: number;
  @Expose()
  outOfStockProductsAllowed?: boolean;

  @Expose()
  reservedQuantities?: any;
}
