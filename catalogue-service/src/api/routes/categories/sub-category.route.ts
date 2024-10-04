import express, { NextFunction, Request, Response } from "express";
import { ContainerTypes } from "../../bindings/container-types";
import { ISubCategoryController } from "../../contracts/i-sub-category.controller";
import { container } from "../../bindings/container-bindings";

export default function subCategoryRoute() {
  const router = express.Router();
  const subCategoryController = container.get<ISubCategoryController>(
    ContainerTypes.SubCategoryController
  );

  router.post("/", (request: Request, response: Response, next: NextFunction) => {
    subCategoryController.createSubCategory(request, response).catch(next);
  });

  router.get("/", (request: Request, response: Response, next: NextFunction) => {
    subCategoryController.getAllSubCategories(request, response).catch(next);
  });

  router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    subCategoryController.getSubCategoryById(request, response).catch(next);
  });

  router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
    subCategoryController.updateSubCategory(request, response).catch(next);
  });

  router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
    subCategoryController.deleteSubCategory(request, response).catch(next);
  });

  router.post("/filter", (request: Request, response: Response, next: NextFunction) => {
    subCategoryController.filterSubCategory(request, response).catch(next);
  });
  router.put("/bulk/update", (request: Request, response: Response, next: NextFunction) => {
    subCategoryController.updateSubCategories(request, response).catch(next);
  });

  router.post("/bulk/create", (request: Request, response: Response, next: NextFunction) => {
    subCategoryController.findOrCreateSubCategorys(request, response).catch(next);
  });

  return router;
}
