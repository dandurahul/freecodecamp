import express, { NextFunction, Request, Response } from "express";
import { container } from "../../bindings/container-bindings";
import { ContainerTypes } from "../../bindings/container-types";
import { IUnavailableProductsController } from "../../contracts/i-unavailable-products.controller";

export default function UnavailableProductsRoute() {
  const router = express.Router();
  const unavailableProducts = container.get<IUnavailableProductsController>(
    ContainerTypes.UnavailableProductsController
  );

  router.post(
    "/bulk",
    (request: Request, response: Response, next: NextFunction) => {
      unavailableProducts
        .createUnavailableProducts(request, response)
        .catch(next);
    }
  );

  router.post(
    "/filter",
    (request: Request, response: Response, next: NextFunction) => {
      unavailableProducts
        .filterUnavailableProducts(request, response)
        .catch(next);
    }
  );

  return router;
}
