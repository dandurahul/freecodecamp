import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { BaseModel } from "../base.model";
import { ExposeId } from "../../../application/utils/custom-transform";
import { SwitchModel } from "./switch.model";
import { SizeMasterModel } from "./size-master.model";
import { MediaTypeModel } from "../media-type.model";

@Exclude()
export class DimensionModel extends BaseModel {
    @Expose()
    sizeChartId!: string;
    @Expose()
    sizeName!: string;
    @Expose()
    @Type(() => SwitchModel)
    switches!: SwitchModel[];
    @Expose()
    sizes!: string[];
    @Expose()
    columns!: string[];
    @Expose()
    @Type(() => SizeMasterModel)
    sizeMaster!: SizeMasterModel[];
    @Expose()
    @Type(() => MediaTypeModel)
    media!: MediaTypeModel[];
    @Expose()
    description!: string;
    @Expose()
    attributeId!: string;
    @Expose()
    activeFlag!: boolean | undefined;
    @Expose()
    deleteFlag!: boolean | undefined;
    @Expose()
    createdBy!: string | undefined;
    @Expose()
    creationDate!: Date | undefined;
    @Expose()
    modifiedBy!: string | undefined;
    @Expose()
    modifiedDate!: Date | undefined;
}
