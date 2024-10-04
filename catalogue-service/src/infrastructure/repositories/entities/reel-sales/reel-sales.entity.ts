import { model, Schema, Document, ObjectId, Types } from "mongoose";
import joi from "joi"
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";
import { ISeoEntity } from "../iseo.entity";

export interface IMedia {
  type: "image" | "video";
  media: string;
  thumbnail: string;
  
}

export interface IReelSalesEntity extends IEntityBase, Document {
  businessUnitId: ObjectId;
  media: IMedia;
  productIds: string[];
  sequenceNo: number;
  seo: ISeoEntity;
  name: string;
}

export const VideoReelsSchema = new Schema<IReelSalesEntity>({
  businessUnitId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  media: {
    type: { type: String, enum: ["image", "video"], required: true },
    media: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },

  productIds: [{ type: Schema.Types.ObjectId, required: true }],
  sequenceNo: { type: Number, required: true },
  seo: {
    type: Types.ObjectId,
    // ref: EntityConstants.SEO_COLLECTION_NAME,
    required: true,
  },
  activeFlag: { type: Boolean, default: true },
  deleteFlag: { type: Boolean, default: false },
  modifiedBy: { type: String, default: "" },
  modifiedDate: { type: Date, default: Date.now },
});

const videoReels = model<IReelSalesEntity>(
  EntityConstants.REEL_SALES,
  VideoReelsSchema,
  EntityConstants.REEL_SALES
);

export default videoReels;
