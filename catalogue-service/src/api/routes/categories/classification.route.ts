import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { IClassificationController } from "../../contracts/i-classification.controller";
import { container } from "../../bindings/container-bindings";
import { next } from "inversify-express-utils";

export default function classificationRoute() {
  const router = express.Router();
  const classificationController = container.get<IClassificationController>(
    ContainerTypes.ClassificationController
  );

  router.post("/", (request: Request, response: Response, next: NextFunction) => {
    classificationController.createClassification(request, response).catch(next);
  });

  router.get("/", (request: Request, response: Response, next: NextFunction) => {
    classificationController.getAllClassifications(request, response).catch(next);
  });

  router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    classificationController.getClassificationById(request, response).catch(next);
  });

  router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
    classificationController.updateClassification(request, response).catch(next);
  });

  router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
    classificationController.deleteClassification(request, response).catch(next);
  });

  router.put("/bulk/update", (request: Request, response: Response) => {
    classificationController.updatClassifications(request, response).catch(next);
  });

  router.post("/filter", (request: Request, response: Response, next: NextFunction) => {
    classificationController.filterClassification(request, response).catch(next);
  });

  router.post("/bulk/create", (request: Request, response: Response, next: NextFunction) => {
    classificationController.findOrCreateClassifications(request, response).catch(next);;
  });

  return router;
}
