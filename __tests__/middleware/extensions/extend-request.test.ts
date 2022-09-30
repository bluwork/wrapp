import { Request, Response, NextFunction } from 'express';
import extendRequestWithBundle from '../../../src/middleware/extensions/extend-request';

describe('Extend request with bundle', () => {
  const mockRequest: Request = {} as Request;

  it('Should add bundle to req', async () => {
    extendRequestWithBundle(
      mockRequest as Request,
      {} as Response,
      jest.fn() as NextFunction,
    );
    expect(mockRequest.bundle).toEqual({});
  });
});
