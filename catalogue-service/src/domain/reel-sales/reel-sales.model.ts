import { Expose, Type } from "class-transformer";
import { BaseModel } from "../models/base.model";
import { ExposeId } from "../../application/utils/custom-transform";
import { ObjectId } from "mongoose";

class Media {
  @Expose()
  type: "image" | "video" | undefined;

  @Expose()
  media: string | undefined;

  @Expose()
  thumbnail: string | undefined;
}
class Seo {
  @Expose()
  title: string | undefined;
  @Expose()
  keyWords: string[] | undefined;
  @Expose()
  description: string | undefined;
  @Expose()
  url: string | undefined;
}

export class ReelSalesModel extends BaseModel {
  @ExposeId()
  @Expose()
  businessUnitId?: ObjectId;
  @Expose()
  @Type(() => Media)
  media?: Media;
  @ExposeId()
  @Expose()
  productIds?: ObjectId[];
  @Expose()
  sequenceNo?: Number;
  @Expose()
  name?: string;
  @Expose()
  @Type(() => Seo)
  seo?: Seo;
  @Expose()
  activeFlag?: boolean;
  @Expose()
  deleteFlag?: boolean;
  @Expose()
  createdBy?: string;
  @Expose()
  creationDate?: Date;
  @Expose()
  modifiedBy?: string;
  @Expose()
  modifiedDate?: Date;
}
