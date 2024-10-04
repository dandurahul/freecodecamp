import { Request, Response } from "express";

export interface IGlobalCatalogueController {
  createGlobalCatalogue(req: Request, res: Response): Promise<void>;
  createGlobalCatalogues(req: Request, res: Response): Promise<void>;
  getAllGlobalCatalogues(req: Request, res: Response): Promise<void>;
  getGlobalCatalogueById(req: Request, res: Response): Promise<void>;
  updateGlobalCatalogue(req: Request, res: Response): Promise<void>;
  deleteGlobalCatalogue(req: Request, res: Response): Promise<void>;
  filterGlobalCatalogue(req: Request, res: Response): Promise<void>;
  getSuggestionsForSearchCriteria(req: Request, res: Response): Promise<void>;
  updateBulkStoreCatalogue(req: Request, res: Response): Promise<void>;
  updateBulkVariants(request: Request, response: Response): Promise<void>;
  updateBulkCatalogProducts(
    request: Request,
    response: Response
  ): Promise<void>;
}
