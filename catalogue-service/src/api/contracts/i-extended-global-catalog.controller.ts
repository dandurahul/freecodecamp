import { Request, Response } from "express";

export interface IExtendedGlobalCatalogController {
  createExtendedGlobalCatalog(req: Request, res: Response): Promise<void>;
  getExtendedGlobalCatalogById(req: Request, res: Response): Promise<void>;
  getExtendedGlobalCatalogs(req: Request, res: Response): Promise<void>;
  updateExtendedGlobalCatalog(req: Request, res: Response): Promise<void>;
  deleteExtendedGlobalCatalog(req: Request, res: Response): Promise<void>;
  filterExtendedGlobalCatalogs(req: Request, res: Response): Promise<void>;
  bulkUpdateForExtendedCatalogues(req: Request, res: Response): Promise<void>;
}
