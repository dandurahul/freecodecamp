import { Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";
import { ISizeEntity, SizeEntitySchema } from "./sizes.entity";

export interface ISizeMasterEntity extends IEntityBase {
    dimensionId: string;
    switchIndex: string;
    switchName: string;
    sizes: ISizeEntity[];
}

export const SizeMasterEntitySchema = new Schema<ISizeMasterEntity>(
    {
        dimensionId: Types.ObjectId,
        switchIndex: String,
        switchName: String,
        sizes: [SizeEntitySchema]
    }
);

const SizeMaster = model<ISizeMasterEntity>(
    EntityConstants.SIZE_MASTER_MODEL_NAME, // Model name
    SizeMasterEntitySchema, // Schema
    EntityConstants.SIZE_MASTER_COLLECTION_NAME //collection name
);

export default SizeMaster;
