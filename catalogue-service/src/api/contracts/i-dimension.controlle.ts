import { Request, Response } from "express";

export interface IDimensionController {
    createDimension(req: Request, res: Response): Promise<void>;
    getDimensionById(req: Request, res: Response): Promise<void>;
    getDimensions(req: Request, res: Response): Promise<void>;
    updateDimension(req: Request, res: Response): Promise<void>;
    deleteDimension(req: Request, res: Response): Promise<void>;
    filterDimension(req: Request, res: Response): Promise<void>;
}