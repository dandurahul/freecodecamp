import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { IGlobalCatalogueController } from "../../contracts/i-global-catalogues.controller";
import { container } from "../../bindings/container-bindings";

export default function globalCatalogueRoute() {
  const router = express.Router();
  const catalogueController = container.get<IGlobalCatalogueController>(
    ContainerTypes.GlobalCatalogueController
  );

  router.post("/", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.createGlobalCatalogue(request, response).catch(next);
  });

  router.post("/bulk", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.createGlobalCatalogues(request, response).catch(next);
  });

  router.get("/", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.getAllGlobalCatalogues(request, response).catch(next);
  });

  router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.getGlobalCatalogueById(request, response).catch(next);
  });

  router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.updateGlobalCatalogue(request, response).catch(next);
  });

  router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.deleteGlobalCatalogue(request, response).catch(next);
  });

  router.post("/search/filter", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.filterGlobalCatalogue(request, response).catch(next);
  });

  router.post("/search/suggestions", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.getSuggestionsForSearchCriteria(request, response).catch(next);
  });

  router.put("/bulk/update", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.updateBulkStoreCatalogue(request, response).catch(next);
  });

  router.put("/bulk/variants", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.updateBulkVariants(request, response).catch(next);
  });

  router.post("/bulk/update", (request: Request, response: Response, next: NextFunction) => {
    catalogueController.updateBulkCatalogProducts(request, response).catch(next);
  });

  return router;
}
