import { Request, Response } from "express";

export interface IProductExemptionController {
  createProductExemption(req: Request, res: Response): Promise<void>;
  getAllProductExemptions(req: Request, res: Response): Promise<void>;
  getProductExemptionById(req: Request, res: Response): Promise<void>;
  updateProductExemption(req: Request, res: Response): Promise<void>;
  deleteProductExemption(req: Request, res: Response): Promise<void>;
  filterProductExemption(req: Request, res: Response): Promise<void>;
}
