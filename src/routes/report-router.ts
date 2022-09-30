import { Router } from 'express';
import reportController from '../controllers/report-controller';
import extractCountry from '../middleware/extraction/extract-country';
import validateCase from '../middleware/validation/validate-case';
import validatePhoneNumber from '../middleware/validation/validate-phone-number';
import validateRequestBody from '../middleware/validation/validate-request-body';

const reportRouter = Router();

reportRouter.post(
  '/',
  validateRequestBody,
  validateCase,
  validatePhoneNumber,
  extractCountry,
  reportController.processReport,
);

export default reportRouter;
