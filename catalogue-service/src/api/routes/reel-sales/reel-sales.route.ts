import express, { NextFunction } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { Request, Response } from "express";
import { IReelSalesController } from "../../contracts/reel-sales.controller";
import { request } from "http";

export default function ReelSales() {
  const router = express.Router();
  const ReelSalesController = container.get<IReelSalesController>(
    ContainerTypes.ReelSalesController
  );

  router.post(
    "/",
    (request: Request, response: Response, next: NextFunction) => {
      ReelSalesController.createReelSales(request, response).catch(next);
    }
  );
  router.get(
    "/",
    (request: Request, response: Response, next: NextFunction) => {
      ReelSalesController.getReelSales(request, response).catch(next);
    }
  );
  router.get(
    "/:id",
    (request: Request, response: Response, next: NextFunction) => {
      ReelSalesController.getReelSalesById(request, response).catch(next);
    }
  );
  router.put(
    "/:id",
    (request: Request, response: Response, next: NextFunction) => {
      ReelSalesController.updateReelSales(request, response).catch(next);
    }
  );
  router.delete(
    "/:id",
    (request: Request, response: Response, next: NextFunction) => {
      ReelSalesController.deleteReelSales(request, response).catch(next);
    }
  );
  router.post(
    "/filter",
    (request: Request, response: Response, next: NextFunction) => {
      ReelSalesController.filterReelSales(request, response).catch(next);
    }
  );
  router.put(
    "/:id/action/:action",
    (request: Request, response: Response, next: NextFunction) => {
      ReelSalesController.updateByAction(request, response).catch(next);
    }
  );

  return router;
}
