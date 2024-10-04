import { Request, Response } from "express";
import { HighlightFilterModel } from "../../domain/models/catagories/filter/highlight-filter.model";

export interface IHighlightController {
  createHighlight(request: Request, res: Response): Promise<void>;
  getAllHighlights(request: Request, res: Response): Promise<void>;
  getHighlightById(request: Request, res: Response): Promise<void>;
  updateHighlight(request: Request, res: Response): Promise<void>;
  deleteHighlight(request: Request, res: Response): Promise<void>;
  syncProductHighlights(request: Request, response: Response): Promise<void>;
  updateHighlights(request: Request, response: Response): Promise<void>;
  findOrCreateHighlights(request: Request, response: Response): Promise<void>;
  filterHighlights(request: Request, response: Response): Promise<void>;
}
