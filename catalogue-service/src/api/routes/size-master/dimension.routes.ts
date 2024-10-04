import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { IReservedQuantityController } from "../../contracts/i-reserved-quantity.controller";
import { ISizeMasterController } from "../../contracts/i-size-master";
import { IDimensionController } from "../../contracts/i-dimension.controlle";

export default function DimensionRoute() {
    const router = express.Router();
    const dimensionController = container.get<IDimensionController>(
        ContainerTypes.DimensionController
    );

    router.post("/", (request: Request, response: Response, next: NextFunction) => {
        dimensionController.createDimension(request, response).catch(next);
    });

    router.get("/", (request: Request, response: Response, next: NextFunction) => {
        dimensionController.getDimensions(request, response).catch(next);
    });

    router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
        dimensionController.getDimensionById(request, response).catch(next);
    });

    router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
        dimensionController.updateDimension(request, response).catch(next);
    });

    router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
        dimensionController.deleteDimension(request, response).catch(next);
    });

    router.post("/filter", (request: Request, response: Response, next: NextFunction) => {
        dimensionController.filterDimension(request, response).catch(next);
    });

    return router;
}
