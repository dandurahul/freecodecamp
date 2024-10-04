import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { IDimensionRepository } from "../../contracts/size-master/i-dimension.repository";
import { IDimensionEntity } from "../../entities/size-master/dimension.entity";
import { buildRequestForDimension } from "../../helpers/dimension-filter.helper";

@injectable()
class DimensionRepository implements IDimensionRepository {
    @inject(ContainerTypes.DimensionRepositoryBase)
    private repositoryBase!: IRepositoryBase<IDimensionEntity>;

    async createDimension(
        dimensionEntity: IDimensionEntity
    ): Promise<IDimensionEntity> {
        return this.repositoryBase.create(dimensionEntity);
    }
    async getDimensionById(id: string): Promise<IDimensionEntity> {
        return this.repositoryBase.findById(id,);
    }
    async getDimensions(query: any): Promise<IDimensionEntity[]> {
        return this.repositoryBase.find(query);
    }

    async updateDimension(
        id: string,
        dimension: IDimensionEntity
    ): Promise<IDimensionEntity> {
        return (await this.repositoryBase.update(
            new mongoose.Types.ObjectId(id),
            dimension
        )) as IDimensionEntity;
    }

    async deleteDimension(id: string): Promise<void> {
        return this.repositoryBase.delete(id);
    }

    async filterDimension(
        query: Object,
        filterType: string,
        pageSize?: number,
        page?: number,
        sort?: string,
    ): Promise<IDimensionEntity[]> {
        query = buildRequestForDimension(query, filterType) as any;
        return this.repositoryBase.filter(
            query,
            "",
            "",
            undefined,
            pageSize,
            page,
            sort
        );
    }
}
export default DimensionRepository;
