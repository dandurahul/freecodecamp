import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { ContainerTypes } from "../../../../api/bindings/container-types";
import { IRepositoryBase } from "../../contracts/base/i-repository-base";
import { ISizeMasterRepository } from "../../contracts/size-master/i-size-master.repository";
import { ISizeMasterEntity } from "../../entities/size-master/size-master.entity";
import { buildRequestForSizeMaster } from "../../helpers/size-master-filter.helper";

@injectable()
class SizeMasterRepository implements ISizeMasterRepository {
    @inject(ContainerTypes.SizeMasterRepositoryBase)
    private repositoryBase!: IRepositoryBase<ISizeMasterEntity>;

    async createSizeMaster(
        reservedQuantity: ISizeMasterEntity
    ): Promise<ISizeMasterEntity> {
        return this.repositoryBase.create(reservedQuantity);
    }
    async getSizeMasterById(id: string): Promise<ISizeMasterEntity> {
        return this.repositoryBase.findById(id);
    }
    async getSizeMasters(
        query: any
    ): Promise<ISizeMasterEntity[]> {
        return this.repositoryBase.find(query);
    }

    async updateSizeMaster(
        id: string,
        reservedQuantity: ISizeMasterEntity
    ): Promise<ISizeMasterEntity> {
        return (await this.repositoryBase.update(
            new mongoose.Types.ObjectId(id),
            reservedQuantity
        )) as ISizeMasterEntity;
    }

    async deleteSizeMaster(id: string): Promise<void> {
        return this.repositoryBase.delete(id);
    }

    async filterSizeMaster(
        query: any,
        filterType: string,
        pageSize: number,
        page: number,
        sort: string,
    ): Promise<ISizeMasterEntity[]> {
        query = buildRequestForSizeMaster(query, filterType) as any;
        return await this.repositoryBase.filter(
            query,
            "",
            "",
            undefined,
            pageSize,
            page,
            sort
        );
    }

    async bulkInsertSizeMaster(
        sizeMaster: ISizeMasterEntity[]
    ): Promise<ISizeMasterEntity[]> {
        return await this.repositoryBase.bulkInsert(sizeMaster);
    }
}
export default SizeMasterRepository;
