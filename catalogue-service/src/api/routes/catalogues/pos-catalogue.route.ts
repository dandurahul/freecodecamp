import express, { Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { ICatalogueController } from "../../contracts/i-catalogue-controller";

export default function posCatalogueRoute() {
  const router = express.Router();
  const posCatalogueController = container.get<ICatalogueController>(
    ContainerTypes.PosCatalogueController
  );

  router.post(
    "/:entityInternalId/pos-products",
    (req: Request, res: Response) => {
      posCatalogueController.createCatalogue(req, res);
    }
  );

  router.post(
    "/:entityInternalId/pos-products/bulk",
    (req: Request, res: Response) => {
      posCatalogueController.createCatalogueProducts(req, res);
    }
  );

  router.get(
    "/:entityInternalId/pos-products",
    (req: Request, res: Response) => {
      posCatalogueController.getCatalogues(req, res);
    }
  );

  router.get(
    "/:entityInternalId/pos-products/:id",
    (req: Request, res: Response) => {
      posCatalogueController.getCatalogueById(req, res);
    }
  );

  router.put(
    "/:entityInternalId/pos-products/:id",
    (req: Request, res: Response) => {
      posCatalogueController.updateCatalogue(req, res);
    }
  );

  router.delete(
    "/:entityInternalId/pos-products/:id",
    (req: Request, res: Response) => {
      posCatalogueController.deleteCatalogue(req, res);
    }
  );

  router.post("/search/filter", (req: Request, res: Response) => {
    posCatalogueController.filterCatalogue(req, res);
  });

  router.post("/filter/product", (req: Request, res: Response) => {
    posCatalogueController.getCatalogueProduct(req, res);
  });

  router.post(
    "/:entityInternalId/products/filter",
    (req: Request, res: Response) => {
      posCatalogueController.filterActiveCatalogueProducts(req, res);
    }
  );

  router.post("/products/count", (req: Request, res: Response) => {
    posCatalogueController.getProductCountBasedOnStores(req, res);
  });

  router.put("/bulk/update", (req: Request, res: Response) => {
    posCatalogueController.updateCatalogueProducts(req, res);
  });

  router.put("/variants/update", (req: Request, res: Response) => {
    posCatalogueController.updateProductVariants(req, res);
  });

  router.put("/bulk/variants", (req: Request, res: Response) => {
    posCatalogueController.updateCatalogueVariants(req, res);
  });

  return router;
}
