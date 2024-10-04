import { Request, Response } from "express";

export interface ICategoryController {
  createCategory(req: Request, res: Response): Promise<void>;
  getAllCategories(req: Request, res: Response): Promise<void>;
  getCategoryById(req: Request, res: Response): Promise<void>;
  updateCategory(req: Request, res: Response): Promise<void>;
  deleteCategory(req: Request, res: Response): Promise<void>;
  filterCategory(req: Request, res: Response): Promise<void>;
  filterCategoryBypagination(req: Request, res: Response): Promise<void>;
  getCategoriesBySearchText(req: Request, res: Response): Promise<void>;
  getTreeForAllCategories(req: Request, res: Response): Promise<void>;
  getCategorizationBasedOnProductIds(
    request: Request,
    response: Response
  ): Promise<void>;
  updateCategories(request: Request, response: Response): Promise<void>;
  findOrCreateCategories(request: Request, response: Response): Promise<void>;
}
