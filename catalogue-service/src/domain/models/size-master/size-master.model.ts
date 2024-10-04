import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import { ExposeId } from "../../../application/utils/custom-transform";
import { SizeModel } from "./size.model";

@Exclude()
export class SizeMasterModel extends BaseModel {
    @Expose()
    @ExposeId()
    dimensionId!: string;
    @Expose()
    switchIndex!: string;
    @Expose()
    switchName!: string;
    @Expose()
    @Type(() => SizeModel)
    sizes!: SizeModel[];
}
