import express, { Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { ICatalogueController } from "../../contracts/i-catalogue-controller";

export default function AndroidCataloguesRoute() {
  const router = express.Router();
  const androidCatalogueController = container.get<ICatalogueController>(
    ContainerTypes.AndroidCatalogueController
  );

  router.post(
    "/:entityInternalId/android-products",
    (req: Request, res: Response) => {
      androidCatalogueController.createCatalogue(req, res);
    }
  );

  router.post(
    "/:entityInternalId/android-products/bulk",
    (req: Request, res: Response) => {
      androidCatalogueController.createCatalogueProducts(req, res);
    }
  );

  router.get(
    "/:entityInternalId/android-products",
    (req: Request, res: Response) => {
      androidCatalogueController.getCatalogues(req, res);
    }
  );

  router.get(
    "/:entityInternalId/android-products/:id",
    (req: Request, res: Response) => {
      androidCatalogueController.getCatalogueById(req, res);
    }
  );

  router.put(
    "/:entityInternalId/android-products/:id",
    (req: Request, res: Response) => {
      androidCatalogueController.updateCatalogue(req, res);
    }
  );

  router.delete(
    "/:entityInternalId/android-products/:id",
    (req: Request, res: Response) => {
      androidCatalogueController.deleteCatalogue(req, res);
    }
  );

  router.post("/search/filter", (req: Request, res: Response) => {
    androidCatalogueController.filterCatalogue(req, res);
  });

  router.post("/filter/product", (req: Request, res: Response) => {
    androidCatalogueController.getCatalogueProduct(req, res);
  });

  router.post(
    "/:entityInternalId/products/filter",
    (req: Request, res: Response) => {
      androidCatalogueController.filterActiveCatalogueProducts(req, res);
    }
  );

  router.post("/products/count", (req: Request, res: Response) => {
    androidCatalogueController.getProductCountBasedOnStores(req, res);
  });

  router.put("/bulk/update", (req: Request, res: Response) => {
    androidCatalogueController.updateCatalogueProducts(req, res);
  });

  router.put("/variants/update", (req: Request, res: Response) => {
    androidCatalogueController.updateProductVariants(req, res);
  });

  router.put("/bulk/variants", (req: Request, res: Response) => {
    androidCatalogueController.updateCatalogueVariants(req, res);
  });

  return router;
}
