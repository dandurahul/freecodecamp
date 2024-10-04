import { Schema, Types, model } from "mongoose";
import { IEntityBase } from "../contracts/i-entity.base";
import { EntityConstants } from "../../../constants/entity-constants";

export interface ISwitchEntity extends IEntityBase {
    label: string;
    index: string;
}

export const SwitchEntitySchema = new Schema<ISwitchEntity>(
    {
        label: String,
        index: String,
    }, {
    _id: false
}
);
