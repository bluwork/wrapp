import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { parsePhoneNumber } from 'libphonenumber-js';

const validatePhoneNumber = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const number = req.bundle.trimmedPhone;
    const parsedNumber = parsePhoneNumber(number);
    if (parsedNumber?.number) {
      req.bundle.witnessPhoneNumber = number;
      const countryCode = parsedNumber.country as string;
      req.bundle.countryCode = countryCode;
      next();
    } else {
      throw {
        name: 'Phone Number',
        status: StatusCodes.BAD_REQUEST,
        message: `Number ${number} isn't valid`,
      };
    }
  } catch (error) {
    next(error);
  }
};

export default validatePhoneNumber;
