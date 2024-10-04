import { Request, Response } from "express";

export interface ICatalogueStockController {
  createOrUpdateCatalogueStock(req: Request, res: Response): Promise<void>;
  getCatalogueStock(req: Request, res: Response): Promise<void>;
  createCatalogueStocks(req: Request, res: Response): Promise<void>;
  filterCatalogueStocks(req: Request, res: Response): Promise<void>;
}
