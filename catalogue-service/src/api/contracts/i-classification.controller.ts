import { Request, Response } from "express";

export interface IClassificationController {
  createClassification(req: Request, res: Response): Promise<void>;
  getAllClassifications(req: Request, res: Response): Promise<void>;
  getClassificationById(req: Request, res: Response): Promise<void>;
  updateClassification(req: Request, res: Response): Promise<void>;
  deleteClassification(req: Request, res: Response): Promise<void>;
  filterClassification(req: Request, res: Response): Promise<void>;
  filterClassificationByPagination?(req: Request, res: Response): Promise<void>;
  updatClassifications(request: Request, response: Response): Promise<void>;
  findOrCreateClassifications(
    request: Request,
    response: Response
  ): Promise<void>;
}
