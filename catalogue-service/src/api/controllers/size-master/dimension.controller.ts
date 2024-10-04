import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../bindings/container-types";
import { ISizeMasterService } from "../../../application/contracts/size-master/i-size-master.service";
import { successResponse } from "../../models/response.model";
import { buildRequestFilterParameters } from "../../builders/request.builder";
import { IDimensionController } from "../../contracts/i-dimension.controlle";
import { DimensionModel } from "../../../domain/models/size-master/dimension.model";
import { IDimensionService } from "../../../application/contracts/size-master/i-dimension.service";

@injectable()
export class DimensionController implements IDimensionController {
    @inject(ContainerTypes.DimensionService)
    private dimensionService!: IDimensionService;

    public async createDimension(
        request: Request,
        response: Response
    ): Promise<void> {
        let dimension: DimensionModel = request.body;
        response.json(successResponse(await this.dimensionService.createDimension(
            dimension
        )));
    }

    public async getDimensions(
        request: Request,
        response: Response
    ): Promise<void> {
        let filterType = request.query.filterType as any;
        response.json(successResponse(await this.dimensionService.getDimensions(
            {},
            filterType
        )));
    }

    async getDimensionById(
        request: Request,
        response: Response
    ): Promise<void> {
        response.json(successResponse(await this.dimensionService.getDimensionById(
            request.params.id
        )));
    }

    async updateDimension(
        request: Request,
        response: Response
    ): Promise<void> {
        const reservedQuantityModel: DimensionModel = request.body;
        response.json(successResponse(await this.dimensionService.updateDimension(
            request.params.id,
            reservedQuantityModel
        )
        ));
    }

    async deleteDimension(
        request: Request,
        response: Response
    ): Promise<void> {
        response.send(
            successResponse(await this.dimensionService.deleteDimension(
                request.params.id
            ))
        );
    }

    async filterDimension(
        request: Request,
        response: Response
    ): Promise<void> {
        let { filterType, filterCriteria, pageSize, page }: any =
            buildRequestFilterParameters(request);
        response.json(
            successResponse(
                await this.dimensionService.filterDimension(
                    filterCriteria,
                    pageSize,
                    page,
                    filterType
                )
            )
        );
    }
}

export default DimensionController;
