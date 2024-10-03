import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { ICustomerController } from "../interface/i-customer";
import { Request, Response } from "express";

@controller("/customer")
export class customer implements ICustomerController {
  create(request: Request, response: Response): Promise<void> {
    const data: any = "rahul Dandu";
    return data;
  }
}
