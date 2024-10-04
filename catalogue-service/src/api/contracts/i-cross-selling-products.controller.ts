import { Request, Response } from "express";

export interface ICrossSellingProductController {
  createCrossSellingProduct(req: Request, res: Response): Promise<void>;
  getAllCrossSellingProducts(req: Request, res: Response): Promise<void>;
  getCrossSellingProductById(req: Request, res: Response): Promise<void>;
  updateCrossSellingProduct(req: Request, res: Response): Promise<void>;
  deleteCrossSellingProduct(req: Request, res: Response): Promise<void>;
  filterCrossSellingProduct(req: Request, res: Response): Promise<void>;
}
