import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import { valuesModel } from "./values.model";

@Exclude()
export class SizeModel extends BaseModel {
    @Expose()
    size!: string;
    @Expose()
    sequence!: string;
    @Expose()
    @Type(() => valuesModel)
    values!: valuesModel[]
}
