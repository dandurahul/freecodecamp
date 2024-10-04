import { Request, Response } from "express";

export interface IReservedQuantityController {
  createReservedQuantity(req: Request, res: Response): Promise<void>;
  getReservedQuantityById(req: Request, res: Response): Promise<void>;
  getAllReservedQuantityDetails(req: Request, res: Response): Promise<void>;
  updateReservedQuantity(req: Request, res: Response): Promise<void>;
  deleteReservedQuantity(req: Request, res: Response): Promise<void>;
  filterReservedQuantity(req: Request, res: Response): Promise<void>;
  updateReservedQuantityWithStockDetails(
    req: Request,
    res: Response
  ): Promise<void>;
}
