import { Request, Response } from "express";

export interface IusersProviderController {
  createUserForProvider(req: Request, res: Response): Promise<void>;
  loadMoneyToProviderUserWallet(req: Request, res: Response): Promise<void>;
  getProviderUserWalletBalance(req: Request, res: Response): Promise<void>;
  getProviderUserWalletStatement(req: Request, res: Response): Promise<void>;
  getProviderWalletUser(req: Request, res: Response): Promise<void>;
  paymentFromProviderUserWallet(req: Request, res: Response): Promise<void>;
}
