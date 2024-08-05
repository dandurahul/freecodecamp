import express, { NextFunction, Request, Response } from "express";
import { container } from "../bindings/container-bindings";
import { ContainerTypes } from "../bindings/container-types";
import { IiretailController } from "../contracts/i-retail-controller";
export default function IRetailRouter() {
  const router = express();
  const IRetailController = container.get<IiretailController>(
    ContainerTypes.IretailController
  );
  router.post(
    "/",
    (request: Request, response: Response, next: NextFunction) => {
      IRetailController.BarCodeSync(request, response).catch(next);
    }
  );
  return router;
}
