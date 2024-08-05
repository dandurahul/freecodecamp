const constants = require("../constants/constants.constants");
var httpContext = require("express-http-context");

export const successResponse = (data: any) => {
  return {
    status: true,
    code: 200,
    data: data,
  };
};

export const errorResponse = (error: any, code: any) => {
  let requestId = httpContext.get(constants.REQUEST_ID);
  let codeType = typeof code;
  let newCode = code;
  if (codeType === constants.TYPEOF_STRING) {
    try {
      newCode = parseInt(newCode);
    } catch (e) {
      newCode = constants.DEFAULY_ERROR_CODE;
    }
  }
  return {
    status: false,
    code: newCode ? newCode : constants.DEFAULY_ERROR_CODE,
    error: error,
    responseContext: {
      requestID: requestId,
      responseID: requestId,
    },
  };
};
