import { Exclude, Expose, Transform } from "class-transformer";
import "reflect-metadata";
import {
  ExposeId,
  customTransform,
} from "../../../application/utils/custom-transform";
import { BaseModel } from "../base.model";
import { MediaTypeModel } from "../media-type.model";
import { SeoModel } from "../seo.model";

@Exclude()
export class StoreCatalogueVariantModel extends BaseModel {
  @ExposeId()
  @Expose()
  productId!: string;
  @Expose()
  productVariantIndex!: number;
  @Expose()
  price!: number;
  @Expose()
  discount!: number;
  @Expose()
  discountType!: string;
  @Expose()
  salesPrice!: number;
  @Expose()
  barcodes!: string[];
  @Expose()
  @ExposeId()
  unitId!: string;
  @Expose()
  allowedScalable!: boolean;
  @Expose()
  alternateUOM!: string;
  @Expose()
  minUOMValue!: string;
  @Expose()
  sku!: string;
  @Expose()
  itemCode!: string;
  @Expose()
  productCode!: string;
  @Expose()
  taxType!: string;
  @Expose()
  taxTemplate!: string;
  @Expose()
  purchaseLimit!: number;
  @Expose()
  minPurchaseLimit!: number;
  @Expose()
  lowStockLimit!: number;
  @Expose()
  sohLimit!: number;
  @Expose()
  stockType!: string;
  @Expose()
  stockBalance!: number;
  @Expose()
  reservedQuantity!: number;
  @Expose()
  alternateSaleUnit!: string;
  @Expose()
  minimumScaleValue!: string;
  @Expose()
  bogoOffer!: boolean;
  @Expose()
  buyProduct!: number;
  @Expose()
  freeProduct!: string;
  @Expose()
  stockExpectedFlag!: boolean;
  @Expose()
  stockExpectedDate!: Date;
  @Expose()
  isPublishToCustomer!: boolean;
}
