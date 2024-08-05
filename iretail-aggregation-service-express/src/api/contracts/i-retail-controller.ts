import { Request, Response } from "express";
export interface IiretailController {
  BarCodeSync(request: Request, response: Response): Promise<any>;
  StockCodeSync(request: Request, response: Response): Promise<any>;
  productPriceSync(request: Request, response: Response): Promise<any>;
}
