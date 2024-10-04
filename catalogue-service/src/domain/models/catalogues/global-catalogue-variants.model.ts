import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import { ExposeId } from "../../../application/utils/custom-transform";

@Exclude()
export class GlobalCatalogueVariantModel extends BaseModel {
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
  @ExposeId()
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
