import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const validateRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const name = trimInputs(req.body?.name);
    const phone = trimInputs(req.body?.phone);

    if (!name) {
      throw {
        name: 'Missing parameter',
        status: StatusCodes.BAD_REQUEST,
        message: 'Name is missing',
      };
    }
    if (!phone) {
      throw {
        name: 'Missing parameter',
        status: StatusCodes.BAD_REQUEST,
        message: 'Phone number is missing',
      };
    }
    req.bundle.trimmedName = name;
    req.bundle.trimmedPhone = phone;
    next();
  } catch (error) {
    next(error);
  }
};

const trimInputs = (val: string | undefined) => (val ? val.trim() : null);

export default validateRequestBody;
