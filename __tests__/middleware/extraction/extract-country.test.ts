import { Request, Response, NextFunction } from 'express';
import extractCountry from '../../../src/middleware/extraction/extract-country';

jest.mock('../../../src/third_party/ipify/find-country-code');

describe('Extract country middleware', () => {
  const mockRequest: Partial<Request> = {
    bundle: { countryCode: 'FR' },
  };
  let mockResponse: any;
  const mockNext = jest.fn();

  it('Should extract France from FR code', () => {
    extractCountry(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );
    expect(mockRequest.bundle.country).toEqual('France');

    expect(mockNext).toBeCalled();
    expect(mockNext).not.toBeCalledWith({});
  });
});
