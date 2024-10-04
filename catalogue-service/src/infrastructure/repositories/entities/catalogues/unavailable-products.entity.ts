import { Document, Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IUnavailableProductsEntity extends IEntityBase, Document {
  businessUnitId?: Types.ObjectId;
  globalCatalogueId?: Types.ObjectId;
  productId?: Types.ObjectId;
  erpId?: string;
  barcode?: string;
  message?: any;
  itemCode?: string;
  erpSource?: string;
}

export const UnavailableProductsEntitySchema =
  new Schema<IUnavailableProductsEntity>({
    businessUnitId: Types.ObjectId,
    globalCatalogueId: Types.ObjectId,
    productId: Types.ObjectId,
    erpId: String,
    erpSource: String,
    barcode: String,
    itemCode: String,
    message: {
      type: String,
      default: function (v: any) {
        if (!v.productId) {
          return "Global product not exist";
        } else if (!v.globalCatalogueId) {
          return "catalogue product not exist";
        } else {
          return "stock updated";
        }
      },
    },
    creationDate: { type: Date, default: new Date() },
  });

const UnavailableProducts = model<IUnavailableProductsEntity>(
  EntityConstants.UNAVAILABLE_PRODUCTS_MODEL_NAME, // Model name
  UnavailableProductsEntitySchema, // Schema
  EntityConstants.UNAVAILABLE_PRODUCTS_COLLECTION_NAME //collection name
);

export default UnavailableProducts;
