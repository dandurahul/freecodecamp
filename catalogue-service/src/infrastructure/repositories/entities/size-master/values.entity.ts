import { Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface IValuesEntity extends IEntityBase {
    label: string;
    value: string;
}

export const ValueEntitySchema = new Schema<IValuesEntity>(
    {
        label: String,
        value: String,
    }, {
    _id: false
}
);
