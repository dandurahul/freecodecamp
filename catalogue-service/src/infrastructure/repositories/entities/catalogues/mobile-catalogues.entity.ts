import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IMobileCatalogueEntity extends IEntityBase, Document {
  businessUnitId: string | undefined;
  entityInternalId: string | undefined;
  storeCatalogue: string | undefined;
  globalCatalogue: string | undefined;
  source: string | undefined;
  productId: string | undefined;
  orderValue: number | undefined;
  highlights: string[] | undefined;
  seo: string | undefined;
  variants: string[] | undefined;
  purchaseVariants: string[] | undefined;
}

export const MobileCatelogueEntitySchema = new Schema<IMobileCatalogueEntity>({
  businessUnitId: Types.ObjectId,
  entityInternalId: Types.ObjectId,
  storeCatalogue: {
    type: Types.ObjectId,
    ref: EntityConstants.STORE_CATALOGUE_MODEL_NAME,
  },
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
      ref: EntityConstants.MOBILE_CATALOGUE_VARIANT_MODEL_NAME,
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

const MobileCatalogue = model<IMobileCatalogueEntity>(
  EntityConstants.MOBILE_CATALOGUE_COLLECTION_NAME, // Model name
  MobileCatelogueEntitySchema, // Schema
  EntityConstants.MOBILE_CATALOGUE_COLLECTION_NAME //collection name
);

export default MobileCatalogue;
