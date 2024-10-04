import express, { NextFunction, Request, Response } from "express";
import { container } from "../../bindings/container-bindings";
import { ContainerTypes } from "../../bindings/container-types";
import { ICategoryController } from "../../contracts/i-catategory.controller";
import { IHighlightController } from "../../contracts/i-highlight.controller";
import { IStoreCatalogueController } from "../../contracts/i-store-catalogues.controller";

export default function highlightRoute() {
  const router = express.Router();
  const highlightContainer = container.get<IHighlightController>(
    ContainerTypes.HighlightController
  );
  const storeCatalogueController = container.get<IStoreCatalogueController>(
    ContainerTypes.StoreCatalogueController
  );

  router.post("/", (request: Request, response: Response, next: NextFunction) => {
    highlightContainer.createHighlight(request, response).catch(next);
  });

  router.get("/", (request: Request, response: Response, next: NextFunction) => {
    highlightContainer.getAllHighlights(request, response).catch(next);
  });

  router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    highlightContainer.getHighlightById(request, response).catch(next);
  });

  router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
    highlightContainer.updateHighlight(request, response).catch(next);
  });

  router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
    highlightContainer.deleteHighlight(request, response).catch(next);
  });

  router.post("/sync", (request: Request, response: Response, next: NextFunction) => {
    highlightContainer.syncProductHighlights(request, response).catch(next);
  });
  router.put("/bulk/update", (request: Request, response: Response, next: NextFunction) => {
    highlightContainer.updateHighlights(request, response).catch(next);
  });

  router.post("/bulk/create", (request: Request, response: Response, next: NextFunction) => {
    highlightContainer.findOrCreateHighlights(request, response).catch(next);
  });

  router.post("/filter", (request: Request, response: Response, next: NextFunction) => {
    highlightContainer.filterHighlights(request, response).catch(next);
  });

  router.post("/sync/store-catalogs", (request: Request, response: Response, next: NextFunction) => {
    storeCatalogueController.getUnSyncedProducts(request, response).catch(next);
  });

  return router;
}
