import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import lookup from 'country-code-lookup';
import findCountryCode from '../../third_party/ipify/find-country-code';

const extractCountry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let country;
    if (
      typeof process.env.ALWAYS_GET_COUNTRY_FROM_IP === 'string' &&
      (process.env.ALWAYS_GET_COUNTRY_FROM_IP as string).toLowerCase() ===
        'true'
    ) {
      country = await getCountryFromIpify();
    } else {
      if (req.bundle.countryCode) {
        const countryData = lookup.byIso(req.bundle.countryCode);
        if (countryData) {
          country = countryData.country;
        }
      } else {
        country = await getCountryFromIpify();
      }
    }

    if (country) {
      req.bundle.country = country as string;
      next();
    } else {
      throw {
        name: 'Insufficient info',
        status: StatusCodes.BAD_REQUEST,
        message: `ALL ways of getting info failed. Please check api keys in config.`,
      };
    }
  } catch (error) {
    next(error);
  }
};

const getCountryFromIpify = async () => {
  if (process.env.IPIFY_API_KEY) {
    const countrySearchResult = await findCountryCode(
      process.env.IPIFY_API_KEY as string,
    );
    return lookup.byIso(countrySearchResult.countryCode)?.country;
  } else {
    throw {
      name: 'Credentials Missing',
      status: StatusCodes.BAD_REQUEST,
      message: 'Set api key',
    };
  }
};

export default extractCountry;
