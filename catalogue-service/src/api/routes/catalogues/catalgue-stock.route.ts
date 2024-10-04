import express, { NextFunction, Request, Response } from "express";
import { container } from "../../bindings/container-bindings";
import { ContainerTypes } from "../../bindings/container-types";
import { ICatalogueStockController } from "../../contracts/i-catalgue-stocks.controller";

export default function CatalogueStockRoute() {
  const router = express.Router();
  const catalogueStock = container.get<ICatalogueStockController>(
    ContainerTypes.CatalogueStockController
  );

  router.post(
    "/",
    (request: Request, response: Response, next: NextFunction) => {
      catalogueStock.createCatalogueStocks(request, response).catch(next);
    }
  );

  router.post(
    "/upsert",
    (request: Request, response: Response, next: NextFunction) => {
      catalogueStock.createOrUpdateCatalogueStock(request, response).catch(next);
    }
  );

  router.post(
    "/get",
    (request: Request, response: Response, next: NextFunction) => {
      catalogueStock.getCatalogueStock(request, response).catch(next);
    }
  );

  router.post(
    "/filter",
    (request: Request, response: Response, next: NextFunction) => {
      catalogueStock.filterCatalogueStocks(request, response).catch(next);
    }
  );

  return router;
}
