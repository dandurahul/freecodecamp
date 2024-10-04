import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IStoreCataloguePurchaseVariantEntity
  extends IEntityBase,
    Document {
  index?: number;
  purchaseType?: string;
  variantId?: number;
  productId?: string;
  entityInternalId?: number;
  purchaseConversion?: number;
}

export const StoreCataloguePurchaseVariantEntitySchema =
  new Schema<IStoreCataloguePurchaseVariantEntity>({
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

const StoreCataloguePurchaseVariant =
  model<IStoreCataloguePurchaseVariantEntity>(
    EntityConstants.STORE_CATALOGUE_PURCHASE_VARIANT_MODEL_NAME, // Model name
    StoreCataloguePurchaseVariantEntitySchema, // Schema
    EntityConstants.STORE_CATALOGUE_PURCHASE_VARIANT_COLLECTION_NAME //collection name
  );

export default StoreCataloguePurchaseVariant;
