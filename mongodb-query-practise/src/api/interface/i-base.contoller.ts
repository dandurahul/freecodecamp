import { Request,Response,NextFunction } from "express";

export interface IBaseController{
create(request:Request,response:Response):Promise<void>
// one(request:Request,response:Response):Promise<void>
// filter(request:Request,response:Response):Promise<void>
// update(request:Request,response:Response):Promise<void>
// delete(request:Request,response:Response):Promise<any>
}