import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IGlobalCataloguePurchaseVariantEntity
  extends IEntityBase,
    Document {
  index?: number;
  purchaseType?: string;
  variantId?: number;
  productId?: string;
  entityInternalId?: string;
  purchaseConversion?: number;
}

export const GlobalCataloguePurchaseVariantEntitySchema =
  new Schema<IGlobalCataloguePurchaseVariantEntity>({
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

const GlobalCataloguePurchaseVariant =
  model<IGlobalCataloguePurchaseVariantEntity>(
    EntityConstants.GLOBAL_CATALOGUE_PURCHASE_VARIANT_MODEL_NAME, // Model name
    GlobalCataloguePurchaseVariantEntitySchema, // Schema
    EntityConstants.GLOBAL_CATALOGUE_PURCHASE_VARIANT_COLLECTION_NAME //collection name
  );

export default GlobalCataloguePurchaseVariant;
