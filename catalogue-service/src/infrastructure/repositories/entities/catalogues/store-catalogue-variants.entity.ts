import { Document, Schema, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IStoreCatalogueVariantEntity extends IEntityBase, Document {
  productId: string;
  productVariantIndex?: number;
  price?: number;
  discount?: number;
  discountType?: string;
  salesPrice?: number;
  barcodes?: string[];
  unitId?: string;
  allowedScalable?: boolean;
  minUOMValue?: string;
  alternateUOM?: string;
  sku?: string;
  itemCode?: string;
  productCode?: string;
  taxType?: string;
  taxTemplate?: string;
  purchaseLimit?: number;
  minPurchaseLimit?: number;
  lowStockLimit?: number;
  sohLimit?: number;
  stockType?: string;
  stockBalance?: number;
  reservedQuantity?: string;
  alternateSaleUnit?: string;
  minimumScaleValue?: string;
  bogoOffer?: boolean;
  buyProduct?: number;
  freeProduct?: string;
  stockExpectedFlag?: boolean;
  stockExpectedDate?: Date;
  isPublishToCustomer?: boolean;
}

export const StoreCatalogueVariantEntitySchema =
  new Schema<IStoreCatalogueVariantEntity>({
    productId: String,
    productVariantIndex: Number,
    price: Number,
    discount: Number,
    discountType: String,
    salesPrice: Number,
    barcodes: [String],
    unitId: String,
    allowedScalable: Boolean,
    minUOMValue: String,
    alternateUOM: String,
    sku: String,
    itemCode: String,
    productCode: String,
    taxType: String,
    taxTemplate: String,
    purchaseLimit: Number,
    minPurchaseLimit: Number,
    lowStockLimit: Number,
    sohLimit: Number,
    stockType: String,
    stockBalance: Number,
    reservedQuantity: String,
    alternateSaleUnit: String,
    minimumScaleValue: String,
    bogoOffer: Boolean,
    buyProduct: Number,
    freeProduct: String,
    stockExpectedFlag: Boolean,
    stockExpectedDate: Date,
    activeFlag: { type: Boolean, default: true },
    deleteFlag: { type: Boolean, default: false },
    createdBy: String,
    creationDate: { type: Date, default: new Date() },
    modifiedBy: String,
    modifiedDate: { type: Date, default: new Date() },
    isPublishToCustomer: { type: Boolean, default: false },
  });

const StoreCatalogueVariant = model<IStoreCatalogueVariantEntity>(
  EntityConstants.STORE_CATALOGUE_VARIANT_MODEL_NAME, // Model name
  StoreCatalogueVariantEntitySchema, // Schema
  EntityConstants.STORE_CATALOGUE_VARIANT_COLLECTION_NAME //collection name
);

export default StoreCatalogueVariant;
