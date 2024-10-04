import express, { Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { ICatalogueController } from "../../contracts/i-catalogue-controller";

export default function webCataloguesRoute() {
  const router = express.Router();
  const webCatalogueController = container.get<ICatalogueController>(
    ContainerTypes.WebCatalogueController
  );

  router.post(
    "/:entityInternalId/web-product",
    (req: Request, res: Response) => {
      webCatalogueController.createCatalogue(req, res);
    }
  );

  router.post(
    "/:entityInternalId/web-products/bulk",
    (req: Request, res: Response) => {
      webCatalogueController.createCatalogueProducts(req, res);
    }
  );

  router.get(
    "/:entityInternalId/web-products",
    (req: Request, res: Response) => {
      webCatalogueController.getCatalogues(req, res);
    }
  );

  router.get(
    "/:entityInternalId/web-product/:id",
    (req: Request, res: Response) => {
      webCatalogueController.getCatalogueById(req, res);
    }
  );

  router.put(
    "/:entityInternalId/web-product/:id",
    (req: Request, res: Response) => {
      webCatalogueController.updateCatalogue(req, res);
    }
  );

  router.delete(
    "/:entityInternalId/web-product/:id",
    (req: Request, res: Response) => {
      webCatalogueController.deleteCatalogue(req, res);
    }
  );

  router.post("/search/filter", (req: Request, res: Response) => {
    webCatalogueController.filterCatalogue(req, res);
  });

  router.post("/filter/product", (req: Request, res: Response) => {
    webCatalogueController.getCatalogueProduct(req, res);
  });

  router.post(
    "/:entityInternalId/products/filter",
    (req: Request, res: Response) => {
      webCatalogueController.filterActiveCatalogueProducts(req, res);
    }
  );

  router.post("/products/count", (req: Request, res: Response) => {
    webCatalogueController.getProductCountBasedOnStores(req, res);
  });

  router.put("/bulk/update", (req: Request, res: Response) => {
    webCatalogueController.updateCatalogueProducts(req, res);
  });

  router.put("/variants/update", (req: Request, res: Response) => {
    webCatalogueController.updateProductVariants(req, res);
  });

  router.put("/bulk/variants", (req: Request, res: Response) => {
    webCatalogueController.updateCatalogueVariants(req, res);
  });

  return router;
}
