import { IDimensionEntity } from "../../entities/size-master/dimension.entity";


export interface IDimensionRepository {
    createDimension(
        dimensionEntity: IDimensionEntity
    ): Promise<IDimensionEntity>;
    getDimensionById(query: string): Promise<IDimensionEntity>;
    getDimensions(query: any): Promise<IDimensionEntity[]>;
    updateDimension(
        id: string,
        dimension: IDimensionEntity
    ): Promise<IDimensionEntity>;
    deleteDimension(id: string): Promise<void>;
    filterDimension(
        query: Object,
        filterType: string,
        pageSize?: number,
        page?: number,
        sort?: string,

    ): Promise<IDimensionEntity[]>;
}
