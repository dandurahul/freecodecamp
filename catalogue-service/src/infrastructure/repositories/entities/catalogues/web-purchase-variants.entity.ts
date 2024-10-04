import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IWebCataloguePurchaseVariantEntity
  extends IEntityBase,
    Document {
  index: number | undefined;
  purchaseType: string | undefined;
  variantId: number | undefined;
  productId: string | undefined;
  entityInternalId: number | undefined;
  purchaseConversion: number | undefined;
}

export const WebCataloguePurchaseVariantEntitySchema =
  new Schema<IWebCataloguePurchaseVariantEntity>({
    index: Number,
    purchaseType: String,
    variantId: Number,
    productId: Types.ObjectId,
    entityInternalId: Types.ObjectId,
    purchaseConversion: Number,
    activeFlag: { type: Boolean, default: true },
    deleteFlag: { type: Boolean, default: false },
    createdBy: String,
    creationDate: { type: Date, default: new Date() },
    modifiedBy: String,
    modifiedDate: { type: Date, default: new Date() },
  });

const WebCataloguePurchaseVariant = model<IWebCataloguePurchaseVariantEntity>(
  EntityConstants.WEB_CATALOGUE_PURCHASE_VARIANT_MODEL_NAME, // Model name
  WebCataloguePurchaseVariantEntitySchema, // Schema
  EntityConstants.WEB_CATALOGUE_PURCHASE_VARIANT_COLLECTION_NAME //collection name
);

export default WebCataloguePurchaseVariant;
