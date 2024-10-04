import { IProviderUserWalletPaymentRequest } from "../../infrastructure/repositories/entities/payment-provider-order.entity";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import { successResponse } from "../models/response.model";
import { ContainerTypes } from "../bindings/container-types";
import { BaseController } from "../contracts/i-base.controller";
import { IusersProviderController } from "../contracts/i-user-provider.controller";
import { IusersProviderService } from "../../application/contracts/i-user-provider.service";
@injectable()
export default class usersProviderController
  extends BaseController
  implements IusersProviderController {
  @inject(ContainerTypes.usersProviderService)
  private usersProviderService!: IusersProviderService;

  async createUserForProvider(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handlePaymentRequest(
      this.usersProviderService.createUserForProvider,
      request,
      response
    );
  }

  async loadMoneyToProviderUserWallet(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handlePaymentRequest(
      this.usersProviderService.loadMoneyToProviderUserWallet,
      request,
      response
    );
  }

  async getProviderUserWalletBalance(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handlePaymentRequest(
      this.usersProviderService.getProviderUserWalletBalance,
      request,
      response
    );
  }

  async getProviderUserWalletStatement(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handlePaymentRequest(
      this.usersProviderService.getProviderUserWalletStatement,
      request,
      response
    );
  }

  async getProviderWalletUser(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handlePaymentRequest(
      this.usersProviderService.getProviderWalletUser,
      request,
      response
    );
  }

  async paymentFromProviderUserWallet(
    request: Request,
    response: Response
  ): Promise<void> {
    request.body.createdBy = this.getCurrentUser(request);
    await this.handlePaymentRequest(
      this.usersProviderService.paymentFromProviderUserWallet,
      request,
      response
    );
  }

  private handlePaymentRequest = async (
    serviceMethod: ServiceMethod,
    request: Request,
    response: Response
  ): Promise<void> => {
    let { userId, paymentIdentifer } = request.params

    let providerOrderRequest: any = request.body;
    let paymentResponse = await serviceMethod(
      userId,
      paymentIdentifer,
      providerOrderRequest
    );
    response.json(successResponse(paymentResponse));
  };
}
interface ServiceMethod {
  (
    userId: string,
    paymentIdentifier: string,
    providerOrderRequest: any
  ): Promise<any>;
}
