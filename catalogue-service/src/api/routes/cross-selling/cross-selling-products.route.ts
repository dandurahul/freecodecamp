import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { ICrossSellingProductController } from "../../contracts/i-cross-selling-products.controller";

export default function crossSellingProductsRoute() {
  const router = express.Router();
  const crossSellingProductsController =
    container.get<ICrossSellingProductController>(
      ContainerTypes.CrossSellingProductsController
    );

  router.post("/", (request: Request, response: Response, next: NextFunction) => {
    crossSellingProductsController.createCrossSellingProduct(request, response).catch(next);
  });

  router.get("/", (request: Request, response: Response, next: NextFunction) => {
    crossSellingProductsController.getAllCrossSellingProducts(request, response).catch(next);
  });

  router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    crossSellingProductsController.getCrossSellingProductById(request, response).catch(next);
  });

  router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
    crossSellingProductsController.updateCrossSellingProduct(request, response).catch(next);
  });

  router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
    crossSellingProductsController.deleteCrossSellingProduct(request, response).catch(next);
  });

  router.post("/filter", (request: Request, response: Response, next: NextFunction) => {
    crossSellingProductsController.filterCrossSellingProduct(request, response).catch(next);
  });

  return router;
}
