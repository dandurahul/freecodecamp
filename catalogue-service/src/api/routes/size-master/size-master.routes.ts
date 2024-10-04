import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { ISizeMasterController } from "../../contracts/i-size-master";

export default function SizeMasterRoute() {
    const router = express.Router();
    const sizeMasterController = container.get<ISizeMasterController>(
        ContainerTypes.SizeMasterController
    );

    router.post("/", (request: Request, response: Response, next: NextFunction) => {
        sizeMasterController.createSizeMaster(request, response).catch(next);
    });

    router.get("/", (request: Request, response: Response, next: NextFunction) => {
        sizeMasterController.getSizeMasters(request, response).catch(next);
    });

    router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
        sizeMasterController.getSizeMasterById(request, response).catch(next);
    });

    router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
        sizeMasterController.updateSizeMaster(request, response).catch(next);
    });

    router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
        sizeMasterController.deleteSizeMaster(request, response).catch(next);
    });

    router.post("/filter", (request: Request, response: Response, next: NextFunction) => {
        sizeMasterController.filterSizeMaster(request, response).catch(next);
    });

    return router;
}
