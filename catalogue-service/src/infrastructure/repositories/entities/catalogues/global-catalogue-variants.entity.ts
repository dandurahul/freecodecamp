import { Document, Schema, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IGlobalCatalogueVariantEntity extends IEntityBase, Document {
  productId?: string;
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
  reservedQuantity?: number;
  alternateSaleUnit?: string;
  minimumScaleValue?: string;
  bogoOffer?: boolean;
  buyProduct?: number;
  freeProduct?: string;
  stockExpectedFlag?: boolean;
  stockExpectedDate?: Date;
  isPublishToCustomer?: boolean;
}

export const GlobalCatalogueVariantEntitySchema =
  new Schema<IGlobalCatalogueVariantEntity>({
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
    reservedQuantity: Number,
    alternateSaleUnit: String,
    minimumScaleValue: String,
    bogoOffer: Boolean,
    buyProduct: Number,
    freeProduct: String,
    stockExpectedFlag: Boolean,
    stockExpectedDate: Date,
    activeFlag: Boolean,
    deleteFlag: Boolean,
    createdBy: String,
    creationDate: Date,
    modifiedBy: String,
    modifiedDate: Date,
    isPublishToCustomer: { type: Boolean, default: false },
  });

const GlobalCatalogueVariant = model<IGlobalCatalogueVariantEntity>(
  EntityConstants.GLOBAL_CATALOGUE_VARIANT_MODEL_NAME, // Model name
  GlobalCatalogueVariantEntitySchema, // Schema
  EntityConstants.GLOBAL_CATALOGUE_VARIANT_COLLECTION_NAME //collection name
);

export default GlobalCatalogueVariant;
