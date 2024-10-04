import { Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IProductExemptionEntity extends IEntityBase {
  exemptionsType?: string;
  exemptionsValue?: any;
  conditionAllowed?: boolean;
  offeringAllowed?: boolean;
}

const ProductExemptionValueEntitySchema = new Schema<any>(
  {
    dataType: String,
    datavalue: Types.ObjectId,
    indexValue: String,
  },
  { _id: false }
);

export const ProductExemptionEntitySchema = new Schema<IProductExemptionEntity>(
  {
    exemptionsType: String,
    exemptionsValue: ProductExemptionValueEntitySchema,
    conditionAllowed: { type: Boolean, default: false },
    offeringAllowed: { type: Boolean, default: false },
    activeFlag: { type: Boolean, default: true },
    deleteFlag: { type: Boolean, default: false },
    createdBy: String,
    creationDate: { type: Date, default: new Date() },
    modifiedBy: String,
    modifiedDate: { type: Date, default: new Date() },
  }
);

const ProductExemption = model<IProductExemptionEntity>(
  EntityConstants.PRODUCT_EXEMPTION_MODEL_NAME, // Model name
  ProductExemptionEntitySchema, // Schema
  EntityConstants.PRODUCT_EXEMPTION_COLLECTION_NAME //collection name
);

export default ProductExemption;
