import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IPosCataloguePurchaseVariantEntity
  extends IEntityBase,
    Document {
  index: number | undefined;
  purchaseType: string | undefined;
  variantId: number | undefined;
  productId: string | undefined;
  entityInternalId: number | undefined;
  purchaseConversion: number | undefined;
}

export const PosCataloguePurchaseVariantEntitySchema =
  new Schema<IPosCataloguePurchaseVariantEntity>({
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

const PosCataloguePurchaseVariant = model<IPosCataloguePurchaseVariantEntity>(
  EntityConstants.POS_CATALOGUE_PURCHASE_VARIANT_MODEL_NAME, // Model name
  PosCataloguePurchaseVariantEntitySchema, // Schema
  EntityConstants.POS_CATALOGUE_PURCHASE_VARIANT_COLLECTION_NAME //collection name
);

export default PosCataloguePurchaseVariant;
