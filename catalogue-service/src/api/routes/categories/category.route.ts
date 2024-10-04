import express, { NextFunction, Request, Response } from "express";
import { container } from "../../bindings/container-bindings";
import { ContainerTypes } from "../../bindings/container-types";
import { ICategoryController } from "../../contracts/i-catategory.controller";
import { ISubCategoryController } from "../../contracts/i-sub-category.controller";

export default function categoryRoute() {
  const router = express.Router();
  const categoryContainer = container.get<ICategoryController>(
    ContainerTypes.CategoryController
  );

  router.post("/", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.createCategory(request, response).catch(next);
  });

  router.post("/tree", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.getTreeForAllCategories(request, response).catch(next);
  });

  router.get("/", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.getAllCategories(request, response).catch(next);
  });

  router.get("/search", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.getCategoriesBySearchText(request, response).catch(next);
  });

  router.get("/:id", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.getCategoryById(request, response).catch(next);
  });

  router.put("/:id", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.updateCategory(request, response).catch(next);
  });

  router.delete("/:id", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.deleteCategory(request, response).catch(next);
  });

  router.get("/:id/sub-categories", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.getCategoryById(request, response).catch(next);
  });

  router.post("/filter", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.filterCategory(request, response).catch(next);
  });

  router.post("/productIds", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.getCategorizationBasedOnProductIds(request, response).catch(next);
  });

  router.put("/bulk/update", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.updateCategories(request, response).catch(next);
  });

  router.post("/bulk/create", (request: Request, response: Response, next: NextFunction) => {
    categoryContainer.findOrCreateCategories(request, response).catch(next);
  });

  return router;
}
