// const handleCastErrorDB = (err: any) => {
//     const message = `Invalid ${err.path} format: ${err.value}.`;
//     return appError(message, 400);
// };

// const handleDuplicateFieldsDB = (err: any) => {
//     const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
//     const message = `Duplicate field value: ${value}. Please use another value!`;
//     console.log({ message })
//     return appError(message, 400);
// };

// const handleValidationErrorDB = (err: any) => {
//     const errors = Object.values(err.errors).map((el: any) => el.message);
//     const message = `Invalid input data. ${errors.join('. ')}`;
//     return appError(message, 400);
// };


export const appError = (message: any, statusCode: any) => Object.assign({
    statusCode,
    message
});


const sendError = (err: any, req: any, res: any) => {
    res.status(err.statusCode).json({
        status: false,
        code: err.statusCode,
        error: { errorCode: "CATALOG-ERR-CODE", errorMessage: err.message },
        responseContext: { requestId: "", responseId: "" },
    });
};

export default (err: any, req: any, res: any, next: any) => {
    console.log({ err });
    err.statusCode = err.code || err.statusCode || 500;
    err.status = err.status || 'error';
    err.message = err?.error?.errorMessage || err?.error?.message || err.message

    if (err.name === 'RequestTimeoutError') {
        err.statusCode = 408;
        err.message = 'Request timed out';
    }

    if (err.name === 'BadRequestError') {
        err.statusCode = 400;
        err.message = 'Bad request';
    }

    sendError(err, req, res);
};
