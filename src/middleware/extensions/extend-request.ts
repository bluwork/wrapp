import { Request, Response, NextFunction } from 'express';

const extendRequestWithBundle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.bundle = {} as Bundle;
  next();
};

export default extendRequestWithBundle;
