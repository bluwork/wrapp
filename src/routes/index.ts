import { Router, Request, Response, NextFunction } from 'express';
import extendRequestWithBundle from '../middleware/extensions/extend-request';
import reportRouter from './report-router';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Wrapi!' });
});

router.use('/report', extendRequestWithBundle, reportRouter);

export default router;
