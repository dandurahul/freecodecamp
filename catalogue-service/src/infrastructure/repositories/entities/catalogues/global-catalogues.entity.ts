import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IGlobalCatalogueEntity extends IEntityBase, Document {
  businessUnitId?: string;
  productId?: string;
  category?: string;
  subCategory?: string;
  classification?: string;
  source?: string;
  orderValue?: number;
  variantsCount?: number;
  highlights?: string[];
  seo?: string;
  variants?: string[];
  purchaseVariants?: string[];
}

export const GlobalCatelogueEntitySchema = new Schema<IGlobalCatalogueEntity>({
  businessUnitId: Types.ObjectId,
  productId: Types.ObjectId,
  category: {
    type: Types.ObjectId,
    ref: EntityConstants.CATAGORY_MODEL_NAME,
  },
  subCategory: {
    type: Types.ObjectId,
    ref: EntityConstants.SUB_CATAGORY_MODEL_NAME,
  },
  classification: {
    type: Types.ObjectId,
    ref: EntityConstants.CLASSIFICATION_MODEL_NAME,
  },
  source: String,
  orderValue: Number,
  variantsCount: Number,
  highlights: [
    {
      type: Types.ObjectId,
      ref: EntityConstants.PRODUCT_HIGHLIGHT_MODEL_NAME,
    },
  ],
  purchaseVariants: [
    {
      type: Types.ObjectId,
      ref: EntityConstants.GLOBAL_CATALOGUE_PURCHASE_VARIANT_MODEL_NAME,
    },
  ],
  variants: [
    {
      type: Types.ObjectId,
      ref: EntityConstants.GLOBAL_CATALOGUE_VARIANT_MODEL_NAME,
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

const GlobalCatalogue = model<IGlobalCatalogueEntity>(
  EntityConstants.GLOBAL_CATALOGUE_MODEL_NAME, // Model name
  GlobalCatelogueEntitySchema, // Schema
  EntityConstants.GLOBAL_CATALOGUE_COLLECTION_NAME //collection name
);

export default GlobalCatalogue;
