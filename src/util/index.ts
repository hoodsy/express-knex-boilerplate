import { Request, Response, NextFunction } from 'express';
import pino from 'pino';

const devOptions = {
    redact: ['req.headers', 'res.headers'],
    transport: {
        target: 'pino-pretty',
    },
};

const logger = pino({
    level: 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    ...(process.env.NODE_ENV === 'development' ? { ...devOptions } : {}),
});

const logErrors = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err) {
        logger.error(err.stack);
        res.sendStatus(500);
    }
};

export default {
    logErrors,
    logger,
};
