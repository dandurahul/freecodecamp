const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path} format: ${err.value}.`;
    return appError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return appError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return appError(message, 400);
};


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
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError')
        err = handleValidationErrorDB(err);
    sendError(err, req, res);
};
