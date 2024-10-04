import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { IReservedQuantityController } from "../../contracts/i-reserved-quantity.controller";

export default function reservedQuantityRoute() {
  const router = express.Router();
  const reservedQuantityController = container.get<IReservedQuantityController>(
    ContainerTypes.ReservedQuantityController
  );

  router.post("/", (request: Request, response: Response, next: NextFunction) => {
    reservedQuantityController.createReservedQuantity(request, response).catch(next);
  });

  router.get("/", (request: Request, response: Response, next: NextFunction) => {
    reservedQuantityController.getAllReservedQuantityDetails(request, response).catch(next);
  });

  router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    reservedQuantityController.getReservedQuantityById(request, response).catch(next);
  });

  router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
    reservedQuantityController.updateReservedQuantity(request, response).catch(next);
  });

  router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
    reservedQuantityController.deleteReservedQuantity(request, response).catch(next);
  });

  router.post("/filter", (request: Request, response: Response, next: NextFunction) => {
    reservedQuantityController.filterReservedQuantity(request, response).catch(next);
  });

  router.post("/stock/update", (request: Request, response: Response, next: NextFunction) => {
    reservedQuantityController.updateReservedQuantityWithStockDetails(request, response).catch(next);
  });

  return router;
}
