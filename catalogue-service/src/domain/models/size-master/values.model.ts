import { Exclude, Expose } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";

@Exclude()
export class valuesModel extends BaseModel {
    @Expose()
    label!: string;
    @Expose()
    value!: string;
}
