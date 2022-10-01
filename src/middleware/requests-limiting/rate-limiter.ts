import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRateLimiterOptions, RateLimiterMemory } from 'rate-limiter-flexible';

const options = {
  points: process.env.LIMITER_POINTS || 10,
  duration: process.env.LIMITER_DURATION_IN_SECONDS || 1,
};

const rateLimiterMemory = new RateLimiterMemory(options as IRateLimiterOptions);

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await rateLimiterMemory.consume(req.ip);
    next();
  } catch (error) {
    next({
      status: StatusCodes.TOO_MANY_REQUESTS,
      message: 'Too many requests',
    });
  }
};

export default rateLimiter;
