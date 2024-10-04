import { Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IReservedQuantityEntity extends IEntityBase {
  entityInternalId?: string;
  orderGenId?: string;
  orderId?: string;
  productId?: string;
  storeProductId?: string;
  storeOrderId?: string;
  variantIndex?: number;
  reservedQuantity?: number;
  lastUpdatedQuantity?: number;
  alternateQuantity?: number;
  orderedDate: Date;
  orderStatus?: string;
  status?: string;
  isAccepted?: boolean;
  isPickingCompleted?: boolean;
  removedProduct?: boolean;
}

export const ReservedQuantityEntitySchema = new Schema<IReservedQuantityEntity>(
  {
    entityInternalId: Types.ObjectId,
    orderId: Types.ObjectId,
    storeOrderId: String,
    orderGenId: String,
    productId: Types.ObjectId,
    storeProductId: Types.ObjectId,
    variantIndex: Number,
    reservedQuantity: Number,
    lastUpdatedQuantity: Number,
    alternateQuantity: Number,
    orderedDate: Date,
    orderStatus: String,
    status: String,
    isAccepted: Boolean,
    isPickingCompleted: Boolean,
    removedProduct: Boolean,
    activeFlag: { type: Boolean, default: true },
    deleteFlag: { type: Boolean, default: false },
    createdBy: String,
    creationDate: { type: Date, default: new Date() },
    modifiedBy: String,
    modifiedDate: { type: Date, default: new Date() },
  }
);

const ReservedQuantity = model<IReservedQuantityEntity>(
  EntityConstants.RESERVED_QUANTITY_MODEL_NAME, // Model name
  ReservedQuantityEntitySchema, // Schema
  EntityConstants.RESERVED_QUANTITY_COLLECTION_NAME //collection name
);

export default ReservedQuantity;
