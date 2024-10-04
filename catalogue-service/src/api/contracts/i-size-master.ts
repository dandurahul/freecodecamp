import { Request, Response } from "express";

export interface ISizeMasterController {
    createSizeMaster(req: Request, res: Response): Promise<void>;
    getSizeMasterById(req: Request, res: Response): Promise<void>;
    getSizeMasters(req: Request, res: Response): Promise<void>;
    updateSizeMaster(req: Request, res: Response): Promise<void>;
    deleteSizeMaster(req: Request, res: Response): Promise<void>;
    filterSizeMaster(req: Request, res: Response): Promise<void>;
}