import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { ISizeMasterController } from "../../contracts/i-size-master";
import { ISizeMasterService } from "../../../application/contracts/size-master/i-size-master.service";
import { SizeMasterModel } from "../../../domain/models/size-master/size-master.model";
import { successResponse } from "../../models/response.model";
import { buildRequestFilterParameters } from "../../builders/request.builder";

@injectable()
export class SizeMasterController implements ISizeMasterController {
    @inject(ContainerTypes.SizeMasterService)
    private sizeMasterService!: ISizeMasterService;

    public async createSizeMaster(
        request: Request,
        response: Response
    ): Promise<void> {
        let sizeMasterModel: SizeMasterModel = request.body;
        response.json(successResponse(await this.sizeMasterService.createSizeMaster(
            sizeMasterModel
        )));
    }

    public async getSizeMasters(
        request: Request,
        response: Response
    ): Promise<void> {
        let filterType = request.query.filterType as any;
        response.json(successResponse(await this.sizeMasterService.getSizeMasters(
            {},
            filterType
        )));
    }

    async getSizeMasterById(
        request: Request,
        response: Response
    ): Promise<void> {
        response.json(successResponse(await this.sizeMasterService.getSizeMasterById(
            request.params.id
        )));
    }

    async updateSizeMaster(
        request: Request,
        response: Response
    ): Promise<void> {
        const reservedQuantityModel: SizeMasterModel = request.body;
        response.json(successResponse(await this.sizeMasterService.updateSizeMaster(
            request.params.id,
            reservedQuantityModel
        )
        ));
    }

    async deleteSizeMaster(
        request: Request,
        response: Response
    ): Promise<void> {
        response.send(
            successResponse(await this.sizeMasterService.deleteSizeMaster(
                request.params.id
            ))
        );
    }

    async filterSizeMaster(
        request: Request,
        response: Response
    ): Promise<void> {
        let { filterType, filterCriteria, pageSize, page }: any =
            buildRequestFilterParameters(request);
        response.json(
            successResponse(
                await this.sizeMasterService.filterSizeMaster(
                    filterCriteria,
                    pageSize,
                    page,
                    filterType
                )
            )
        );
    }



}

export default SizeMasterController;
