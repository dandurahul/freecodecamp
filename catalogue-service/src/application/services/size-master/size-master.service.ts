import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { ErrorMessages } from "../../constants/error-messages";
import { ContainerTypes } from "../../../api/bindings/container-types";
import { IReservedQuantityEntity } from "../../../infrastructure/repositories/entities/reserved/reserved-quantity.entity";
import { ISizeMasterService } from "../../contracts/size-master/i-size-master.service";
import { ISizeMasterRepository } from "../../../infrastructure/repositories/contracts/size-master/i-size-master.repository";
import { SizeMasterModel } from "../../../domain/models/size-master/size-master.model";
import { ISizeMasterEntity } from "../../../infrastructure/repositories/entities/size-master/size-master.entity";

@injectable()
class SizeMasterService implements ISizeMasterService {
    @inject(ContainerTypes.SizeMasterRepository)
    private sizeMasterRepository!: ISizeMasterRepository;

    async createSizeMaster(
        sizeMaster: SizeMasterModel
    ): Promise<SizeMasterModel> {
        let sizeMasterEntity = instanceToPlain(
            sizeMaster
        ) as ISizeMasterEntity;
        return plainToInstance(SizeMasterModel, await this.sizeMasterRepository.createSizeMaster(
            sizeMasterEntity
        ));
    }

    async getSizeMasters(
        filterCriteria: Object,
        filterType: string
    ): Promise<SizeMasterModel[]> {
        return plainToInstance(SizeMasterModel, this.sizeMasterRepository.getSizeMasters({
            deleteFlag: false,
        })) as any;
    }

    async getSizeMasterById(id: string): Promise<SizeMasterModel> {
        return plainToInstance(SizeMasterModel, await this.sizeMasterRepository.getSizeMasterById(id));
    }

    async updateSizeMaster(
        id: string,
        sizeMaster: SizeMasterModel
    ): Promise<SizeMasterModel> {
        let sizeMasterEntity = instanceToPlain(
            sizeMaster
        ) as ISizeMasterEntity;
        return plainToInstance(SizeMasterModel, this.sizeMasterRepository.updateSizeMaster(
            id,
            sizeMasterEntity
        ));

    }

    async deleteSizeMaster(id: string): Promise<any> {
        await this.sizeMasterRepository.deleteSizeMaster(id);
        return {
            message: ErrorMessages.DELETE_SIZE_MASTER_SUCCESSFULLY,
        };
    }

    async filterSizeMaster(
        filter: any,
        pageSize: number,
        page: number,
        filterType: string
    ): Promise<any> {
        return plainToInstance(SizeMasterModel, await this.sizeMasterRepository.filterSizeMaster(
            filter,
            filterType,
            pageSize,
            page,
            ""
        )) as any;
    }
}

export default SizeMasterService;
