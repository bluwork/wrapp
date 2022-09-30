import { Request, Response, NextFunction } from 'express';
import errorHandler from '../../../src/middleware/error/error-handler';

describe('Error handler (middleware)', () => {
  let responseObject: any;
  const mockRequest: Partial<Request> = {};
  const mockResponse: Partial<Response> = {
    status: jest.fn().mockImplementation((code) => {
      mockResponse.statusCode = code;
      return {
        json: jest.fn().mockImplementation((result) => {
          responseObject = result;
        }),
      };
    }),
  };
  const mockNext: NextFunction = jest.fn();
  let err;

  it('Should return default error response', () => {
    err = {};
    errorHandler(
      err as any,
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );
    expect(mockResponse.status).toBeCalled();
    expect(responseObject.message).toEqual('Internal Server Error');
    expect(responseObject.status).toEqual(500);
    expect(responseObject.name).toEqual('Error');
  });
});
