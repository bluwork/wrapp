import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorResponse = {} as ErrorResponse;
  errorResponse.name = err.name || 'Error';
  errorResponse.status =
    (err.status as number) || StatusCodes.INTERNAL_SERVER_ERROR;
  errorResponse.message = err.message || 'Internal Server Error';
  errorResponse.path = err.path;
  errorResponse.headers = err.headers;
  errorResponse.errors = err.errors;

  if (errorResponse.name === 'ParseError') {
    errorResponse.name = 'Phone Number';
    errorResponse.status = StatusCodes.BAD_REQUEST;
  }

  res.status(errorResponse.status).json({ ...errorResponse });
};

export default errorHandler;
