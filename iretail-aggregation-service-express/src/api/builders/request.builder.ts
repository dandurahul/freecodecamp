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
//
export const buildRequestFilterParameters = (request: Request) => {
  let requestModel: requestFilterParametersModel = {
    filterCriteria: Object,
    page: 0,
    pageSize: 0,
    filterType: "",
    fetchType: "",
    searchKey: "",
    businessUnitId: "",
  };
  requestModel.filterCriteria = request.body;
  requestModel.filterType = request.query.filterType as any;
  requestModel.pageSize = request.query["pageSize"]
    ? Number(request.query["pageSize"])
    : 0;
  requestModel.page = request.query["page"] ? Number(request.query["page"]) : 0;
  requestModel.fetchType = request.query["fetchType"] as any;
  requestModel.searchKey = request.query.searchKey as any;
  requestModel.businessUnitId = request.query.businessUnitId as any;

  return requestModel;
};
