import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IStoreCatalogueEntity extends IEntityBase, Document {
  businessUnitId?: string;
  entityInternalId?: string;
  globalCatalogue?: string;
  source?: string;
  productId?: string;
  orderValue?: number;
  highlights?: string[];
  seo?: string;
  variants?: string[];
  purchaseVariants?: string[];
}

export const StoreCatelogueEntitySchema = new Schema<IStoreCatalogueEntity>({
  businessUnitId: Types.ObjectId,
  entityInternalId: Types.ObjectId,
  globalCatalogue: {
    type: Types.ObjectId,
    ref: EntityConstants.GLOBAL_CATALOGUE_MODEL_NAME,
  },
  source: String,
  productId: Types.ObjectId,
  orderValue: Number,
  highlights: [
    {
      type: Types.ObjectId,
      ref: EntityConstants.PRODUCT_HIGHLIGHT_MODEL_NAME,
    },
  ],
  purchaseVariants: [
    {
      type: Types.ObjectId,
      ref: EntityConstants.STORE_CATALOGUE_PURCHASE_VARIANT_MODEL_NAME,
    },
  ],
  variants: [
    {
      type: Types.ObjectId,
      ref: EntityConstants.STORE_CATALOGUE_VARIANT_MODEL_NAME,
    },
  ],
  seo: { type: Types.ObjectId, ref: EntityConstants.SEO_MODEL_NAME },
  activeFlag: { type: Boolean, default: true },
  deleteFlag: { type: Boolean, default: false },
  createdBy: String,
  creationDate: { type: Date, default: new Date() },
  modifiedBy: String,
  modifiedDate: { type: Date, default: new Date() },
});

const StoreCatalogue = model<IStoreCatalogueEntity>(
  EntityConstants.STORE_CATALOGUE_MODEL_NAME, // Model name
  StoreCatelogueEntitySchema, // Schema
  EntityConstants.STORE_CATALOGUE_COLLECTION_NAME //collection name
);

export default StoreCatalogue;
