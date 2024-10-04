import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { IStoreCatalogueController } from "../../contracts/i-store-catalogues.controller";

export default function storeCataloguesRoute() {
  const router = express.Router();
  const storeCatalogueController = container.get<IStoreCatalogueController>(
    ContainerTypes.StoreCatalogueController
  );

  router.post(
    "/:entityInternalId/store-catalogs",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .createStoreCatalogue(request, response)
        .catch(next);
    }
  );

  router.post(
    "/:entityInternalId/store-catalogs/bulk",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .createStoreCatalogueProducts(request, response)
        .catch(next);
    }
  );

  router.get(
    "/:entityInternalId/store-catalogs",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .getStoreCatalogues(request, response)
        .catch(next);
    }
  );

  router.get(
    "/:entityInternalId/store-catalogs/:id",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .getStoreCatalogueById(request, response)
        .catch(next);
    }
  );

  router.put(
    "/:entityInternalId/store-catalogs/:id",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .updateStoreCatalogue(request, response)
        .catch(next);
    }
  );

  router.delete(
    "/:entityInternalId/store-catalogs/:id",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .deleteStoreCatalogue(request, response)
        .catch(next);
    }
  );

  router.post(
    "/search/filter",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .filterStoreCatalogue(request, response)
        .catch(next);
    }
  );

  router.post(
    "/filter/product",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController.getStoreProduct(request, response).catch(next);
    }
  );

  router.post(
    "/:entityInternalId/products/filter",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .filterActiveStoreCatalogueProducts(request, response)
        .catch(next);
    }
  );

  router.post(
    "/products/count",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .getProductCountBasedOnStores(request, response)
        .catch(next);
    }
  );

  router.put(
    "/bulk/update",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .updateStoreCatalogueProducts(request, response)
        .catch(next);
    }
  );

  router.put(
    "/variants/update",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .updateProductVariants(request, response)
        .catch(next);
    }
  );

  router.put(
    "/bulk/variants",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .updateStoreCatalogueVariants(request, response)
        .catch(next);
    }
  );
  router.post(
    "/productVariants/filter",
    (request: Request, response: Response, next: NextFunction) => {
      storeCatalogueController
        .filterProductVariants(request, response)
        .catch(next);
    }
  );

  return router;
}
