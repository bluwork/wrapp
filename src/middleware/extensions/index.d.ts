type Bundle = {
  trimmedName: string;
  trimmedPhone: string;
  caseTitle: string;
  witnessPhoneNumber: string;
  countryCode: string;
  country: string;
};

namespace Express {
  export interface Request {
    bundle: Bundle;
  }
}
