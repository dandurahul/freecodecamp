import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { IExtendedGlobalCatalogController } from "../../contracts/i-extended-global-catalog.controller";

export default function ExtendedGlobalCatalogRoute() {
  const router = express.Router();
  const ExtendedGlobalCatalogController =
    container.get<IExtendedGlobalCatalogController>(
      ContainerTypes.ExtendedGlobalCatalogController
    );

  router.post(
    "/",
    (request: Request, response: Response, next: NextFunction) => {
      ExtendedGlobalCatalogController.createExtendedGlobalCatalog(
        request,
        response
      ).catch(next);
    }
  );

  router.get(
    "/",
    (request: Request, response: Response, next: NextFunction) => {
      ExtendedGlobalCatalogController.getExtendedGlobalCatalogs(
        request,
        response
      ).catch(next);
    }
  );

  router.get(
    "/:id",
    (request: Request, response: Response, next: NextFunction) => {
      ExtendedGlobalCatalogController.getExtendedGlobalCatalogById(
        request,
        response
      ).catch(next);
    }
  );

  router.put(
    "/:id",
    (request: Request, response: Response, next: NextFunction) => {
      ExtendedGlobalCatalogController.updateExtendedGlobalCatalog(
        request,
        response
      ).catch(next);
    }
  );

  router.delete(
    "/:id",
    (request: Request, response: Response, next: NextFunction) => {
      ExtendedGlobalCatalogController.deleteExtendedGlobalCatalog(
        request,
        response
      ).catch(next);
    }
  );

  router.post(
    "/filter",
    (request: Request, response: Response, next: NextFunction) => {
      ExtendedGlobalCatalogController.filterExtendedGlobalCatalogs(
        request,
        response
      ).catch(next);
    }
  );

  router.post(
    "/bulk/update",
    (request: Request, response: Response, next: NextFunction) => {
      ExtendedGlobalCatalogController.bulkUpdateForExtendedCatalogues(
        request,
        response
      ).catch(next);
    }
  );

  return router;
}
