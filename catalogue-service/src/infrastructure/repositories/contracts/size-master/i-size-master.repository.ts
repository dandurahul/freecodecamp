import { ISizeMasterEntity } from "../../entities/size-master/size-master.entity";

export interface ISizeMasterRepository {
    createSizeMaster(
        sizeMasterEntity: ISizeMasterEntity
    ): Promise<ISizeMasterEntity>;
    getSizeMasterById(query: any): Promise<ISizeMasterEntity>;
    getSizeMasters(query: any): Promise<ISizeMasterEntity[]>;
    updateSizeMaster(
        id: string,
        sizeMaster: ISizeMasterEntity
    ): Promise<ISizeMasterEntity>;
    deleteSizeMaster(id: string): Promise<void>;
    filterSizeMaster(
        query: Object,
        filterType?: string,
        pageSize?: number,
        page?: number,
        sort?: string,
    ): Promise<ISizeMasterEntity[]>;
    bulkInsertSizeMaster(
        sizeMaster: ISizeMasterEntity[]
    ): Promise<ISizeMasterEntity[]>;
}
