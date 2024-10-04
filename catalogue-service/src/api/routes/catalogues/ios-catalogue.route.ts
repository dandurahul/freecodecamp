import express, { Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { ICatalogueController } from "../../contracts/i-catalogue-controller";

export default function IosCatalogueRoute() {
  const router = express.Router();
  const iosCatalogueController = container.get<ICatalogueController>(
    ContainerTypes.IosCatalogueController
  );

  router.post(
    "/:entityInternalId/ios-products",
    (req: Request, res: Response) => {
      iosCatalogueController.createCatalogue(req, res);
    }
  );

  router.post(
    "/:entityInternalId/ios-products/bulk",
    (req: Request, res: Response) => {
      iosCatalogueController.createCatalogueProducts(req, res);
    }
  );

  router.get(
    "/:entityInternalId/ios-products",
    (req: Request, res: Response) => {
      iosCatalogueController.getCatalogues(req, res);
    }
  );

  router.get(
    "/:entityInternalId/ios-products/:id",
    (req: Request, res: Response) => {
      iosCatalogueController.getCatalogueById(req, res);
    }
  );

  router.put(
    "/:entityInternalId/ios-products/:id",
    (req: Request, res: Response) => {
      iosCatalogueController.updateCatalogue(req, res);
    }
  );

  router.delete(
    "/:entityInternalId/ios-products/:id",
    (req: Request, res: Response) => {
      iosCatalogueController.deleteCatalogue(req, res);
    }
  );

  router.post("/search/filter", (req: Request, res: Response) => {
    iosCatalogueController.filterCatalogue(req, res);
  });

  router.post("/filter/product", (req: Request, res: Response) => {
    iosCatalogueController.getCatalogueProduct(req, res);
  });

  router.post(
    "/:entityInternalId/products/filter",
    (req: Request, res: Response) => {
      iosCatalogueController.filterActiveCatalogueProducts(req, res);
    }
  );

  router.post("/products/count", (req: Request, res: Response) => {
    iosCatalogueController.getProductCountBasedOnStores(req, res);
  });

  router.put("/bulk/update", (req: Request, res: Response) => {
    iosCatalogueController.updateCatalogueProducts(req, res);
  });

  router.put("/variants/update", (req: Request, res: Response) => {
    iosCatalogueController.updateProductVariants(req, res);
  });

  router.put("/bulk/variants", (req: Request, res: Response) => {
    iosCatalogueController.updateCatalogueVariants(req, res);
  });

  return router;
}
