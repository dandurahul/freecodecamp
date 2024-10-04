import { SizeMasterModel } from "../../../domain/models/size-master/size-master.model";

export interface ISizeMasterService {
    createSizeMaster(
        reservedQuantity: SizeMasterModel
    ): Promise<SizeMasterModel>;

    getSizeMasterById(_id: string): Promise<SizeMasterModel>;
    getSizeMasters(
        filterCriteria: Object,
        filterType: string
    ): Promise<SizeMasterModel[]>;
    updateSizeMaster(
        _id: string,
        reservedQuantity: SizeMasterModel
    ): Promise<SizeMasterModel>;
    deleteSizeMaster(id: string): Promise<void>;
    filterSizeMaster(
        filterCriteria: Object,
        pageSize: number,
        page: number,
        filterType: string
    ): Promise<SizeMasterModel[]>;
}