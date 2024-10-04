import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { ExposeId } from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";
import { SeoModel } from "../seo.model";
import { StoreCatalogueVariantModel } from "./store-catalogue-variants.model";
import { StoreCataloguePurchaseVariantModel } from "./store-catalogue-purchase-variants.model";
import { GlobalCatalogueDetailsModel } from "./global-catalogue-details.model";

@Exclude()
export class CatalogueModel extends BaseModel {
  @Expose()
  @ExposeId()
  businessUnitId!: string;
  @Expose()
  @ExposeId()
  entityInternalId!: string;
  @Expose()
  @ExposeId()
  productId!: string;
  @Expose()
  source!: string;
  @Expose()
  @ExposeId()
  storeCatalogue!: string;
  @Expose()
  @ExposeId()
  @Type(() => GlobalCatalogueDetailsModel)
  globalCatalogue!: GlobalCatalogueDetailsModel;
  @Expose()
  orderValue!: number;
  @Expose()
  @ExposeId()
  highlights!: string[];
  @Expose()
  @ExposeId()
  @Type(() => StoreCatalogueVariantModel)
  variants!: StoreCatalogueVariantModel[];
  @Expose()
  @ExposeId()
  @Type(() => StoreCataloguePurchaseVariantModel)
  purchaseVariants!: StoreCataloguePurchaseVariantModel[];
  @Expose()
  @Type(() => SeoModel)
  seo!: SeoModel;
  @Expose()
  variantsCount!: number;
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
