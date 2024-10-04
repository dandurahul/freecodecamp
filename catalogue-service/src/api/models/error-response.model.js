const commonErrorHandling = (err: any, req: any, res: any, next: any) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: false,
    code: statusCode,
    error: { errorCode: statusCode, errorMessage: err.message },
    responseContext: { requestId: "", responseId: "" },
  });
};

module.exports = commonErrorHandling;
