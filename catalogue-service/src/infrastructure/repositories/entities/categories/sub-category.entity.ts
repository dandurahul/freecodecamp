import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";
import { IMediaTypeEntity } from "../imedia-type.entity";
import dotenv from "dotenv";
dotenv.config();

export interface ISubCategoryEntity extends IEntityBase, Document {
  businessUnitId: string | undefined;
  categoryId: string | undefined;
  secondaryCategory?: string[];
  subCategoryName: string;
  description: string | undefined;
  webMedia?: IMediaTypeEntity;
  mobileMedia?: IMediaTypeEntity;
  posMedia?: IMediaTypeEntity;
  orderValue?: number;
  toolTip?: string;
  productAllowed?: boolean;
  seo?: string;
  sizeChartId?: string;
}

export const SubCategoryEntitySchema = new Schema<ISubCategoryEntity>({
  businessUnitId: Types.ObjectId,
  categoryId: {
    type: Types.ObjectId,
    ref: EntityConstants.CATAGORY_MODEL_NAME,
  },
  secondaryCategory: [
    {
      type: Types.ObjectId,
      ref: EntityConstants.CATAGORY_MODEL_NAME,
    },
  ],
  subCategoryName: {
    type: String,
  },
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

// if (process.env.UNIQUE_WITH_CATEGORY === FilterConstants.TRUE) {
SubCategoryEntitySchema.index(
  { subCategoryName: 1, categoryId: 1, businessUnitId: 1 },
  { unique: true }
);
// } else {
//   SubCategoryEntitySchema.index({ subCategoryName: 1 }, { unique: true });
// }

const SubCategory = model<ISubCategoryEntity>(
  EntityConstants.SUB_CATAGORY_MODEL_NAME, // Model name
  SubCategoryEntitySchema, // Schema
  EntityConstants.SUB_CATAGORY_COLLECTION_NAME //collection name
);

export default SubCategory;
