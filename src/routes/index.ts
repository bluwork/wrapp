import { Router } from 'express';
import extendRequestWithBundle from '../middleware/extensions/extend-request';
import reportRouter from './report-router';

const router = Router();

router.use('/report', extendRequestWithBundle, reportRouter);

export default router;
