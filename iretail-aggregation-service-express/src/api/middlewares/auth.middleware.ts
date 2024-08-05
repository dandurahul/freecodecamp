import { Request, Response, NextFunction } from "express";
import { constants } from "../constants/constants.constants";
import httpContext from "express-http-context";
import { errorResponse } from "../models/response.model";
import { container } from "../bindings/container-bindings";
import AuthorizationService from "../../application/contracts/support-services/authorization.service";
import { ContainerTypes } from "../bindings/container-types";
import errorResponseForAuth from "../builders/error-response.builder";

export default function authTokenValidation(serviceName: string) {
  const authService = container.get<AuthorizationService>(
    ContainerTypes.AuthorizationService
  );
  return async (req: Request, res: Response, next: NextFunction) => {
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
    let requestId = req.headers[constants.REQUEST_ID];
    httpContext.set("requestid", requestId);
    let result;
    try {
      if (req.headers.permissioncheck === constants.ALLOW) {
        next();
      } else {
        result = await authService.validateApiName(req, serviceName);
        if (result && result.isTrue === true) {
          req.params.customerId = result.userId;
          if (!req.params?.customerId) {
            let error = errorResponseForAuth.LoginError;
            return res.send(error);
          }
          let userName = result.userName ? result.userName : "";
          httpContext.set("userName", userName);
          next();
        }
      }
    } catch (e: any) {
      let errorObj = errorResponse(e.error, e.code);
      res.status(errorObj.code).json(errorObj);
    }
  };
}
