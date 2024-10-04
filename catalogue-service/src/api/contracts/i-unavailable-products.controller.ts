import { Request, Response } from "express";

export interface IUnavailableProductsController {
  filterUnavailableProducts(req: Request, res: Response): Promise<void>;
  createUnavailableProducts(
    request: Request,
    response: Response
  ): Promise<void>;
}
