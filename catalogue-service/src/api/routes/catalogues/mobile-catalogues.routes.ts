import express, { Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { container } from "../../bindings/container-bindings";
import { ICatalogueController } from "../../contracts/i-catalogue-controller";

export default function mobileCataloguesRoute() {
  const router = express.Router();
  const mobileCatalogueController = container.get<ICatalogueController>(
    ContainerTypes.MobileCatalogueController
  );

  router.post(
    "/:entityInternalId/mobile-product",
    (req: Request, res: Response) => {
      mobileCatalogueController.createCatalogue(req, res);
    }
  );

  router.post(
    "/:entityInternalId/mobile-products/bulk",
    (req: Request, res: Response) => {
      mobileCatalogueController.createCatalogueProducts(req, res);
    }
  );

  router.get(
    "/:entityInternalId/mobile-products",
    (req: Request, res: Response) => {
      mobileCatalogueController.getCatalogues(req, res);
    }
  );

  router.get(
    "/:entityInternalId/mobile-product/:id",
    (req: Request, res: Response) => {
      mobileCatalogueController.getCatalogueById(req, res);
    }
  );

  router.put(
    "/:entityInternalId/mobile-product/:id",
    (req: Request, res: Response) => {
      mobileCatalogueController.updateCatalogue(req, res);
    }
  );

  router.delete(
    "/:entityInternalId/mobile-product/:id",
    (req: Request, res: Response) => {
      mobileCatalogueController.deleteCatalogue(req, res);
    }
  );

  router.post("/search/filter", (req: Request, res: Response) => {
    mobileCatalogueController.filterCatalogue(req, res);
  });

  router.post("/filter/product", (req: Request, res: Response) => {
    mobileCatalogueController.getCatalogueProduct(req, res);
  });

  router.post(
    "/:entityInternalId/products/filter",
    (req: Request, res: Response) => {
      mobileCatalogueController.filterActiveCatalogueProducts(req, res);
    }
  );

  router.post("/products/count", (req: Request, res: Response) => {
    mobileCatalogueController.getProductCountBasedOnStores(req, res);
  });

  router.put("/bulk/update", (req: Request, res: Response) => {
    mobileCatalogueController.updateCatalogue(req, res);
  });

  router.put("/variants/update", (req: Request, res: Response) => {
    mobileCatalogueController.updateProductVariants(req, res);
  });

  router.put("/bulk/variants", (req: Request, res: Response) => {
    mobileCatalogueController.updateCatalogueVariants(req, res);
  });

  return router;
}
