import { Request, Response } from "express";

export interface IReelSalesController {
  createReelSales(request: Request, response: Response): Promise<any>;
  getReelSales(request: Request, response: Response): Promise<any>;
  updateReelSales(request: Request, response: Response): Promise<any>;
  filterReelSales(request: Request, response: Response): Promise<any>;
  deleteReelSales(request: Request, response: Response): Promise<any>;
  getReelSalesById(request: Request, response: Response): Promise<any>;
  updateByAction(request: Request, response: Response): Promise<any>;
}
