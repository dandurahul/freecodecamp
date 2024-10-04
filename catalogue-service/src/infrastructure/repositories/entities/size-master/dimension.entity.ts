import { Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";
import { ISwitchEntity, SwitchEntitySchema } from "./switches.entity";
import { IMediaTypeEntity, MediaTypeEntitySchema } from "../imedia-type.entity";

export interface IDimensionEntity extends IEntityBase {
    sizeChartId: string;
    sizeName: string;
    switches: ISwitchEntity[];
    sizes: string[];
    columns: string[];
    sizeMaster: any[]
    media: IMediaTypeEntity[];
    description: string;
    attributeId?: string;
}

export const DimensionEntitySchema = new Schema<IDimensionEntity>(
    {
        sizeChartId: { type: String, unique: true },
        sizeName: { type: String, unique: true },
        switches: [SwitchEntitySchema],
        sizes: [String],
        columns: [String],
        media: [MediaTypeEntitySchema],
        attributeId: {
            type: Types.ObjectId,
        },
        description: String,
        activeFlag: { type: Boolean, default: true },
        deleteFlag: { type: Boolean, default: false },
        createdBy: String,
        creationDate: { type: Date, default: new Date() },
        modifiedBy: String,
        modifiedDate: { type: Date, default: new Date() },
    }
);

const Dimension = model<IDimensionEntity>(
    EntityConstants.DIMENSION_MODEL_NAME, // Model name
    DimensionEntitySchema, // Schema
    EntityConstants.DIMENSION_COLLECTION_NAME //collection name
);

export default Dimension;
