import { Request, Response } from "express";

export interface ICatalogueController {
  createCatalogue(req: Request, res: Response): Promise<void>;
  createCatalogueProducts(req: Request, res: Response): Promise<void>;
  getCatalogues(req: Request, res: Response): Promise<void>;
  getCatalogueById(req: Request, res: Response): Promise<void>;
  updateCatalogue(req: Request, res: Response): Promise<void>;
  deleteCatalogue(req: Request, res: Response): Promise<void>;
  filterCatalogue(req: Request, res: Response): Promise<void>;
  getCatalogueProduct(req: Request, res: Response): Promise<void>;
  getProductCountBasedOnStores(req: Request, res: Response): Promise<void>;
  updateCatalogueProducts(req: Request, res: Response): Promise<void>;
  filterActiveCatalogueProducts(req: Request, res: Response): Promise<void>;
  updateProductVariants(request: Request, response: Response): Promise<void>;
  updateCatalogueVariants(request: Request, response: Response): Promise<void>;
}
