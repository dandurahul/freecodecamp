import express, { NextFunction, Request, Response } from "express";
import { container } from "../bindings/container-bindings";
import { ContainerTypes } from "../bindings/container-types";
import { IusersProviderController } from "../contracts/i-user-provider.controller";

export default function playerRoute() {
  const router = express.Router();
  const paymentContainer = container.get<IusersProviderController>(
    ContainerTypes.usersProviderController
  );
  router.post(
    "/:userId/payment-provider/:paymentIdentifer/users",
    async (request: Request, response: Response, next: NextFunction) => {
      paymentContainer.createUserForProvider(request, response).catch(next);
    }
  );
  router.post(
    "/:userId/payment-provider/:paymentIdentifer/load/amount",
    async (request: Request, response: Response, next: NextFunction) => {
      paymentContainer
        .loadMoneyToProviderUserWallet(request, response)
        .catch(next);
    }
  );
  router.post(
    "/:userId/payment-provider/:paymentIdentifer/balance",
    (request: Request, response: Response, next: NextFunction) => {
      paymentContainer
        .getProviderUserWalletBalance(request, response)
        .catch(next);
    }
  );
  router.post(
    "/:userId/payment-provider/:paymentIdentifer/statement",
    (request: Request, response: Response, next: NextFunction) => {
      paymentContainer
        .getProviderUserWalletStatement(request, response)
        .catch(next);
    }
  );
  router.post(
    "/:userId/payment-provider/:paymentIdentifer",
    (request: Request, response: Response, next: NextFunction) => {
      paymentContainer.getProviderWalletUser(request, response).catch(next);
    }
  );
  router.post(
    "/:userId/payment-provider/:paymentIdentifer/wallet",
    (request: Request, response: Response, next: NextFunction) => {
      paymentContainer
        .paymentFromProviderUserWallet(request, response)
        .catch(next);
    }
  );

  return router;
}
