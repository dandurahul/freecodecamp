import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { IProductExemptionController } from "../../contracts/i-product-exemptions.controller";

export default function productExemptionRoute() {
  const router = express.Router();
  const productExemptionController = container.get<IProductExemptionController>(
    ContainerTypes.ProductExemptionsController
  );

  router.post("/", (request: Request, response: Response, next: NextFunction) => {
    productExemptionController.createProductExemption(request, response).catch(next);
  });

  router.get("/", (request: Request, response: Response, next: NextFunction) => {
    productExemptionController.getAllProductExemptions(request, response).catch(next);
  });

  router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    productExemptionController.getProductExemptionById(request, response).catch(next);
  });

  router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
    productExemptionController.updateProductExemption(request, response).catch(next);
  });

  router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
    productExemptionController.deleteProductExemption(request, response).catch(next);
  });

  router.post("/filter", (request: Request, response: Response, next: NextFunction) => {
    productExemptionController.filterProductExemption(request, response).catch(next);
  });

  return router;
}
