import { Schema, Types, model, Document } from "mongoose";
import { EntityConstants } from "../../../constants/entity-constants";
import { IEntityBase } from "../contracts/i-entity.base";

export interface IExtendedGlobalCatalogEntity extends IEntityBase, Document {
  productId?: string;
  globalCatalogue?: string;
  categoryId?: string;
  subCategoryId?: string;
  classificationId?: string;
  secondaryCategory?: string;
  secondarySubCategory?: string;
}

export const extendedGlobalCatalogSchema =
  new Schema<IExtendedGlobalCatalogEntity>({
    productId: Types.ObjectId,
    globalCatalogue: {
      type: Types.ObjectId,
      ref: EntityConstants.GLOBAL_CATALOGUE_MODEL_NAME,
    },
    categoryId: {
      type: Types.ObjectId,
      ref: EntityConstants.CATAGORY_MODEL_NAME,
    },
    subCategoryId: {
      type: Types.ObjectId,
      ref: EntityConstants.SUB_CATAGORY_MODEL_NAME,
    },
    classificationId: {
      type: Types.ObjectId,
      ref: EntityConstants.CLASSIFICATION_MODEL_NAME,
    },
    secondaryCategory: [
      {
        type: Types.ObjectId,
        ref: EntityConstants.CATAGORY_MODEL_NAME,
      },
    ],
    secondarySubCategory: [
      {
        type: Types.ObjectId,
        ref: EntityConstants.SUB_CATAGORY_MODEL_NAME,
      },
    ],
    activeFlag: { type: Boolean, default: true },
    deleteFlag: { type: Boolean, default: false },
    createdBy: String,
    creationDate: { type: Date, default: new Date() },
    modifiedBy: String,
    modifiedDate: { type: Date, default: new Date() },
  });

const ExtendedGlobalCatalog = model<IExtendedGlobalCatalogEntity>(
  EntityConstants.EXTENDED_GLOBAL_CATALOG_MODEL_NAME,
  extendedGlobalCatalogSchema,
  EntityConstants.EXTENDED_GLOBAL_CATALOG_MODEL_NAME
);

export default ExtendedGlobalCatalog;
