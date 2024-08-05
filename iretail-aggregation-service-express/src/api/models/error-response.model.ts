const commonErrorHandling = (
  statusCode: number,
  errorCode: string,
  errorMessage: string
) => {
  throw Object.assign({
    code: statusCode,
    error: {
      errorCode: errorCode,
      message: errorMessage,
    },
  });
};

export default commonErrorHandling;
