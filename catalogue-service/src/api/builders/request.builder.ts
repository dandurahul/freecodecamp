import { PaginationModel } from "../../domain/models/pagination/pagination.model";
import { Request } from "express";
import { requestFilterParametersModel } from "../models/request-parameters.model";

export const buildPaginationObject = (
  pageCount: number,
  pageSize: number
): PaginationModel => {
  return {
    pageSize: pageSize,
    pageCount: pageCount,
    noOfPages: pageSize ? pageCount / pageSize : 1,
  };
};
export const buildRequestFilterParameters = (request: Request) => {
  let requestModel: requestFilterParametersModel = {
    filterCriteria: Object,
    page: 0,
    pageSize: 0,
    filterType: "",
    sort: "",
  };
  requestModel.filterCriteria = request.body as any;
  requestModel.filterType = request.query.filterType as any;
  requestModel.pageSize =
    request.query["pageSize"] !== "undefined" || undefined
      ? Number(request.query["pageSize"])
      : 25;

  requestModel.page =
    request.query["page"] !== "undefined" || undefined
      ? Number(request.query["page"])
      : 1;
  requestModel.sort = request.query["sort"]
    ? String(request.query["sort"])
    : "";

  return requestModel;
};
