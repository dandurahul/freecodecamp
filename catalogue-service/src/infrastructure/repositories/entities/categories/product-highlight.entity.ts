import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IProductHighlightEntity extends IEntityBase, Document {
  businessUnitId?: string;
  productHighlightCode?: string;
  productHighlight?: string;
  description?: string;
  webBanner?: string;
  mobileBanner?: string;
  seo?: string;
}

export const ProductHighlightEntitySchema = new Schema<IProductHighlightEntity>(
  {
    businessUnitId: Types.ObjectId,
    productHighlightCode: String,
    productHighlight: String,
    description: String,
    webBanner: {
      type: Types.ObjectId,
      ref: EntityConstants.MEDIA_TYPE_MODEL_NAME,
    },
    mobileBanner: {
      type: Types.ObjectId,
      ref: EntityConstants.MEDIA_TYPE_MODEL_NAME,
    },
    seo: { type: Types.ObjectId, ref: EntityConstants.SEO_MODEL_NAME },
    activeFlag: { type: Boolean, default: true },
    deleteFlag: { type: Boolean, default: false },
    createdBy: String,
    creationDate: { type: Date, default: new Date() },
    modifiedBy: String,
    modifiedDate: { type: Date, default: new Date() },
  }
);

const ProductHighlight = model<IProductHighlightEntity>(
  EntityConstants.PRODUCT_HIGHLIGHT_MODEL_NAME, // Model name
  ProductHighlightEntitySchema, // Schema
  EntityConstants.PRODUCT_HIGHLIGHT_COLLECTION_NAME //collection name
);

export default ProductHighlight;
