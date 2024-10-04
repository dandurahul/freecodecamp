import { Request, Response } from "express";

export interface IStoreCatalogueController {
  createStoreCatalogue(req: Request, res: Response): Promise<void>;
  createStoreCatalogueProducts(req: Request, res: Response): Promise<void>;
  getStoreCatalogues(req: Request, res: Response): Promise<void>;
  getStoreCatalogueById(req: Request, res: Response): Promise<void>;
  updateStoreCatalogue(req: Request, res: Response): Promise<void>;
  deleteStoreCatalogue(req: Request, res: Response): Promise<void>;
  filterStoreCatalogue(req: Request, res: Response): Promise<void>;
  getStoreProduct(req: Request, res: Response): Promise<void>;
  getProductCountBasedOnStores(req: Request, res: Response): Promise<void>;
  updateStoreCatalogueProducts(req: Request, res: Response): Promise<void>;
  filterActiveStoreCatalogueProducts(
    req: Request,
    res: Response
  ): Promise<void>;
  updateProductVariants(request: Request, response: Response): Promise<void>;
  updateStoreCatalogueVariants(
    request: Request,
    response: Response
  ): Promise<void>;
  updateStoreCatalogueVariants(request: Request, response: Response): Promise<void>;
  getUnSyncedProducts(request: Request, response: Response): Promise<void>;
  filterProductVariants(request: Request, response: Response): Promise<void>;
}
