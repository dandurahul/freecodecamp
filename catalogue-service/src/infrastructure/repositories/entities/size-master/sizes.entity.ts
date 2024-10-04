import { Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";
import { IValuesEntity, ValueEntitySchema } from "./values.entity";

export interface ISizeEntity extends IEntityBase {
    size: string;
    sequence: string;
    values: IValuesEntity[]
}

export const SizeEntitySchema = new Schema<ISizeEntity>(
    {
        size: String,
        sequence: String,
        values: [ValueEntitySchema]
    }, {
    _id: false
}
);
