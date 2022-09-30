import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import reportService from '../services/report-service';

const processReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const report: WitnessReport = {
      caseRelatedName: req.bundle.caseTitle,
      witnessPhoneNumber: req.bundle.witnessPhoneNumber,
      country: req.bundle.country,
      reportedAt: new Date().toISOString(),
    };
    const processedReport = await reportService.processReport(report);

    res.status(StatusCodes.OK).json({ success: true, report: processedReport });
  } catch (error) {
    next(error);
  }
};

export default {
  processReport,
};
