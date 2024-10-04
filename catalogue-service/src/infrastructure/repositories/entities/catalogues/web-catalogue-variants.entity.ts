import { Document, Schema, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IWebCatalogueVariantEntity extends IEntityBase, Document {
  productVariantIndex: number | undefined;
  price: number | undefined;
  discount: number | undefined;
  discountType: string | undefined;
  salesPrice: number | undefined;
  barcodes: string[] | undefined;
  unitId: string | undefined;
  allowedScalable: boolean | undefined;
  minUOMValue: string | undefined;
  alternateUOM: string | undefined;
  sku: string | undefined;
  itemCode: string | undefined;
  productCode: string | undefined;
  taxType: string | undefined;
  taxTemplate: string | undefined;
  purchaseLimit: number | undefined;
  minPurchaseLimit: number | undefined;
  lowStockLimit: number | undefined;
  sohLimit: number | undefined;
  stockType: string | undefined;
  stockBalance: number | undefined;
  reservedQuantity: string | undefined;
  alternateSaleUnit: string | undefined;
  minimumScaleValue: string | undefined;
  bogoOffer: boolean | undefined;
  buyProduct: number | undefined;
  freeProduct: string | undefined;
  stockExpectedFlag: boolean | undefined;
  stockExpectedDate: Date | undefined;
  isPublishToCustomer?: boolean;
}

export const WebCatalogueVariantEntitySchema = new Schema<IWebCatalogueVariantEntity>({
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
  isPublishToCustomer: { type: Boolean, default: true }
});

const WebCatalogueVariant = model<IWebCatalogueVariantEntity>(
  EntityConstants.WEB_CATALOGUE_VARIANT_MODEL_NAME, // Model name
  WebCatalogueVariantEntitySchema, // Schema
  EntityConstants.WEB_CATALOGUE_VARIANT_COLLECTION_NAME //collection name
);

export default WebCatalogueVariant;
