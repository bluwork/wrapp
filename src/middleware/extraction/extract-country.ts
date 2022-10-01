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
    // Country is, by default, extracted from phone number. For some numbers (eg +800)
    // country cannot be extracted
    let country = getCountryFromCode(req.bundle.countryCode);

    // If alwaysGetCountryFromIp is true, we always get country from geo locating
    // Also, if we do not want to use geo locating every time, but we cannot get country
    // from phone number, we then need to try to get it from ipify

    if (useGeoLocation) {
      if (!country || alwaysGetCountryFromIp) {
        const countryFromIpify = await getCountryFromIpify();
        if (countryFromIpify) {
          country = countryFromIpify;
        }
      }
    }

    if (country) {
      req.bundle.country = country as string;
      next();
    } else {
      throw {
        name: 'Insufficient info',
        status: StatusCodes.BAD_REQUEST,
        message: `Cannot get data. Please check api keys in config.`,
      };
    }
  } catch (error) {
    next(error);
  }
};

const getCountryFromIpify = async () => {
  if (ipifyApiKey) {
    const countrySearchResult = await findCountryCode(ipifyApiKey);
    return lookup.byIso(countrySearchResult.countryCode)?.country;
  } else {
    throw {
      name: 'Credentials Missing',
      status: StatusCodes.BAD_REQUEST,
      message: 'Set api key',
    };
  }
};

const getCountryFromCode = (code: string | undefined): string | undefined => {
  if (code) {
    const countryData = lookup.byIso(code);
    if (countryData) {
      return countryData.country;
    }
  }
};

const processEnv = (variable: any) => {
  if (typeof variable === 'string') {
    if (variable.toLowerCase() === 'true') return true;
    if (variable.toLowerCase() === 'false') return false;
  }
  return variable;
};

const useGeoLocation = processEnv(process.env.USE_GEO_LOCATING);
const ipifyApiKey = processEnv(process.env.IPIFY_API_KEY);
const alwaysGetCountryFromIp = processEnv(
  process.env.ALWAYS_GET_COUNTRY_FROM_IP,
);

export default extractCountry;
