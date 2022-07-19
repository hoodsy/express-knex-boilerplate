import { Request, Response, NextFunction } from 'express';
import pino from 'pino';

const logger = pino({
    level: 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    ...(process.env.NODE_ENV === 'development'
        ? {
              transport: {
                  target: 'pino-pretty',
              },
          }
        : {}),
});

const logErrors = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
};

export default {
    logErrors,
    logger,
};
