import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import caseChecker from '../../third_party/fbi/case-checker';

const validateCase = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const name = req.bundle.trimmedName;

    const searchResult: CaseSearchResult = await caseChecker.caseInfo(name);

    if (searchResult.error) {
      throw searchResult.error;
    }

    if (searchResult.resultsFound > 0) {
      if (searchResult.caseFound) {
        req.bundle.caseTitle = name;
        next();
      } else {
        throw {
          name: 'DB check',
          status: StatusCodes.BAD_REQUEST,
          message: `The number of results is greater than 1. Please enter the exact title.`,
        };
      }
    } else {
      throw {
        name: 'DB check',
        status: StatusCodes.NOT_FOUND,
        message: `Case with  title ${name} doesn't exist in FBI database`,
      };
    }
  } catch (error) {
    next(error);
  }
};

export default validateCase;
