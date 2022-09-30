import { Request, Response, NextFunction } from 'express';
import validateRequestBody from '../../../src/middleware/validation/validate-request-body';

describe('Input validation', () => {
  let mockRequest: Partial<Request>;
  const mockResponse: Partial<Response> = {};
  let mockNext = jest.fn();

  beforeEach(() => {
    mockRequest = { body: {} };
    mockNext = jest.fn();
  });

  it('Should call next if all params are present', () => {
    mockRequest.body.name = 'Amazing';
    mockRequest.body.phone = '+3234343';
    validateRequestBody(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );
    expect(mockNext).toBeCalled();
    expect(mockNext).not.toBeCalledWith({});
  });
  it('Should call next with error object if one or both params are missing', () => {
    mockRequest.body.name = 'Amazing';
    // mockRequest.body.phone = '+3234343';
    validateRequestBody(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );
    expect(mockNext).toBeCalled();
    expect(mockNext).toBeCalledWith({
      message: 'Phone number is missing',
      name: 'Missing parameter',
      status: 400,
    });
  });
});
