import express, { NextFunction, Request, Response } from "express";
import { ISalesInvoiceController } from "../contracts/i-sales-invoice-controller";
import { ContainerTypes } from "../bindings/container-types";
import { container } from "../bindings/container-bindings";

export default function SalesInvoiceRouter() {
  const router = express();
  const SalesInvoice = container.get<ISalesInvoiceController>(
    ContainerTypes.SalesInvoiceController
  );
  router.post(
    "/",
    (request: Request, response: Response, next: NextFunction) => {
      SalesInvoice.postSalesInvoice(request, response).catch(next);
    }
  );
  return router;
}
