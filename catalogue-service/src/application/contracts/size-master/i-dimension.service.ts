import { DimensionModel } from "../../../domain/models/size-master/dimension.model";

export interface IDimensionService {
    createDimension(
        dimension: DimensionModel
    ): Promise<DimensionModel>;
    getDimensionById(_id: string): Promise<DimensionModel>;
    getDimensions(
        filterCriteria: Object,
        filterType: string
    ): Promise<DimensionModel[]>;
    updateDimension(
        _id: string,
        dimension: DimensionModel
    ): Promise<DimensionModel>;
    deleteDimension(id: string): Promise<void>;
    filterDimension(
        filterCriteria: Object,
        pageSize: number,
        page: number,
        filterType: string
    ): Promise<DimensionModel[]>;
}