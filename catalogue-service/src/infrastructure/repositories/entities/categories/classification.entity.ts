import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";
import { IMediaTypeEntity } from "../imedia-type.entity";
import { FilterConstants } from "../../../../application/constants/filter.constants";
import dotenv from "dotenv";
dotenv.config();

export interface IClassificationEntity extends IEntityBase, Document {
  businessUnitId?: string;
  categoryId?: string;
  subCategoryId?: string;
  classificationName?: string;
  description?: string;
  webMedia?: IMediaTypeEntity;
  mobileMedia?: IMediaTypeEntity;
  posMedia?: IMediaTypeEntity;
  orderValue?: number;
  toolTip?: string;
  productAllowed?: boolean;
  seo?: string;
  secondarySubCategory: string[];
  sizeChartId?: string;
}

export const ClassificationEntitySchema = new Schema<IClassificationEntity>({
  businessUnitId: Types.ObjectId,
  categoryId: {
    type: Types.ObjectId,
    ref: EntityConstants.CATAGORY_MODEL_NAME,
    required: true,
  },
  subCategoryId: {
    type: Types.ObjectId,
    ref: EntityConstants.SUB_CATAGORY_MODEL_NAME,
    required: true,
  },
  classificationName: {
    type: String,
    required: true,
  },
  secondarySubCategory: [{ type: Types.ObjectId }],
  description: String,
  webMedia: {
    type: Types.ObjectId,
    ref: EntityConstants.MEDIA_TYPE_MODEL_NAME,
  },
  mobileMedia: {
    type: Types.ObjectId,
    ref: EntityConstants.MEDIA_TYPE_MODEL_NAME,
  },
  posMedia: {
    type: Types.ObjectId,
    ref: EntityConstants.MEDIA_TYPE_MODEL_NAME,
  },
  orderValue: Number,
  toolTip: String,
  productAllowed: Boolean,
  seo: { type: Types.ObjectId, ref: EntityConstants.SEO_MODEL_NAME },
  activeFlag: { type: Boolean, default: true },
  deleteFlag: { type: Boolean, default: false },
  createdBy: String,
  creationDate: { type: Date, default: new Date() },
  modifiedBy: String,
  modifiedDate: { type: Date, default: new Date() },
  sizeChartId: Types.ObjectId,
});

if (process.env.UNIQUE_WITH_CATEGORY === FilterConstants.TRUE) {
  ClassificationEntitySchema.index(
    { classificationName: 1, subCategoryId: 1, categoryId: 1 },
    { unique: true }
  );
} else {
  ClassificationEntitySchema.index({ classificationName: 1 }, { unique: true });
}

const Classification = model<IClassificationEntity>(
  EntityConstants.CLASSIFICATION_MODEL_NAME, // Model name
  ClassificationEntitySchema, // Schema
  EntityConstants.CLASSIFICATION_COLLECTION_NAME //collection name
);

export default Classification;
