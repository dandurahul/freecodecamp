import { Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface ICrossSellingProductsEntity extends IEntityBase {
  productId?: string;
  crossSellingProducts: string[];
  businessUnitId: string | undefined;
}

export const crossSellingProductsEntitySchema =
  new Schema<ICrossSellingProductsEntity>({
    productId: { type: Types.ObjectId },
    businessUnitId: Types.ObjectId,
    crossSellingProducts: [{ type: Types.ObjectId }],
    activeFlag: { type: Boolean, default: true },
    deleteFlag: { type: Boolean, default: false },
    createdBy: String,
    creationDate: { type: Date, default: new Date() }, //TODO: move to service.
    modifiedBy: String,
    modifiedDate: { type: Date, default: new Date() },
  });

const CrossSellingProducts = model<ICrossSellingProductsEntity>(
  EntityConstants.CROSS_SELLING_PRODUCTS_MODEL_NAME, // Model name
  crossSellingProductsEntitySchema, // Schema
  EntityConstants.CROSS_SELLING_PRODUCTS_COLLECTION_NAME //collection name
);

export default CrossSellingProducts;
