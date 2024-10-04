import { Request, Response } from "express";

export interface ISubCategoryController {
  createSubCategory(req: Request, res: Response): Promise<void>;
  getAllSubCategories(req: Request, res: Response): Promise<void>;
  getSubCategoryById(req: Request, res: Response): Promise<void>;
  updateSubCategory(req: Request, res: Response): Promise<void>;
  deleteSubCategory(req: Request, res: Response): Promise<void>;
  filterSubCategory(req: Request, res: Response): Promise<void>;
  filterSubCategoryByPagination(req: Request, res: Response): Promise<void>;
  updateSubCategories(request: Request, response: Response): Promise<void>;
  findOrCreateSubCategorys(request: Request, response: Response): Promise<void>;
}
