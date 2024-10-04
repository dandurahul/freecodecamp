import "reflect-metadata";
import { Type, instanceToPlain, plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IDimensionRepository } from "../../../infrastructure/repositories/contracts/size-master/i-dimension.repository";
import { DimensionModel } from "../../../domain/models/size-master/dimension.model";
import { IDimensionEntity } from "../../../infrastructure/repositories/entities/size-master/dimension.entity";
import { IDimensionService } from "../../contracts/size-master/i-dimension.service";
import { TransformOptions } from "../../constants/transform-options";
import { ISizeMasterRepository } from "../../../infrastructure/repositories/contracts/size-master/i-size-master.repository";
import { ISizeMasterEntity } from "../../../infrastructure/repositories/entities/size-master/size-master.entity";

@injectable()
class DimensionService implements IDimensionService {
    @inject(ContainerTypes.DimensionRepository)
    private dimensionRepository!: IDimensionRepository;
    @inject(ContainerTypes.SizeMasterRepository)
    private sizeMasterRepository!: ISizeMasterRepository;

    async createDimension(
        dimension: DimensionModel
    ): Promise<DimensionModel> {
        let sizeMaster = dimension.sizeMaster;
        let dimensionEntity = instanceToPlain(
            dimension
        ) as IDimensionEntity;
        let dimensionObject: any = plainToInstance(DimensionModel, await this.dimensionRepository.createDimension(
            dimensionEntity
        ),
            TransformOptions.tranformOptions
        )
        sizeMaster = sizeMaster?.map(item => {
            item.dimensionId = dimensionObject._id.toString();
            return item;
        })
        let sizeMasterEntity = instanceToPlain(
            sizeMaster
        ) as ISizeMasterEntity[];
        await this.sizeMasterRepository.bulkInsertSizeMaster(sizeMasterEntity)
        return dimensionObject
    }

    async getDimensions(
        filterCriteria: Object,
        filterType: string
    ): Promise<DimensionModel[]> {
        return plainToInstance(DimensionModel, await this.dimensionRepository.getDimensions({
            deleteFlag: false,
        }), TransformOptions.tranformOptions) as any;
    }

    async getDimensionById(id: string): Promise<DimensionModel> {
        let dimension = await this.dimensionRepository.getDimensionById(id);
        let sizemaster = await this.sizeMasterRepository.filterSizeMaster({
            dimensionId: id
        })

        dimension.sizeMaster = sizemaster
        return plainToInstance(DimensionModel, dimension, TransformOptions.tranformOptions);
    }

    async updateDimension(
        id: string,
        dimension: DimensionModel
    ): Promise<DimensionModel> {
        let sizeMaster = dimension?.sizeMaster;
        let dimensionEntity = instanceToPlain(
            dimension
        ) as IDimensionEntity;
        sizeMaster?.map((item: any) => {
            this.sizeMasterRepository.updateSizeMaster(item.id, item)
        })
        return plainToInstance(DimensionModel, this.dimensionRepository.updateDimension(
            id,
            dimensionEntity
        ), TransformOptions.tranformOptions);

    }

    async deleteDimension(id: string): Promise<any> {
        await this.dimensionRepository.deleteDimension(id);
        return {
            message: ErrorMessages.DELETE_SIZE_MASTER_SUCCESSFULLY,
        };
    }

    async filterDimension(
        filter: any,
        pageSize: number,
        page: number,
        filterType: string
    ): Promise<any> {
        return plainToInstance(DimensionModel, await this.dimensionRepository.filterDimension(
            filter,
            filterType,
            pageSize,
            page,
            ""
        ), TransformOptions.tranformOptions) as any;
    }
}

export default DimensionService;
