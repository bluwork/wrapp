import { Request, Response, NextFunction } from 'express';
import reportController from '../../src/controllers/report-controller';

jest.mock('../../src/services/report-service');

describe('Report controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: any;
  let mockNext: NextFunction;

  it('should get report confirmation', async () => {
    let responseObject: any;
    mockRequest = {
      bundle: {
        caseTitle: 'Case Title',
        witnessPhoneNumber: '+333456345',
        country: 'France',
      },
    };

    mockResponse = {
      status: jest.fn().mockImplementation((code) => {
        mockResponse.statusCode = code;
        return {
          json: jest.fn().mockImplementation((result) => {
            responseObject = result;
          }),
        };
      }),
    };
    mockNext = jest.fn();

    await reportController.processReport(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockNext).not.toBeCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject).toEqual(
      expect.objectContaining({
        success: true,
        report: expect.objectContaining({
          caseRelatedName: 'Case Title',
          witnessPhoneNumber: '+333456345',
          country: 'France',
          reportedAt: expect.any(String),
        }),
      }),
    );
  });
});
