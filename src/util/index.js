const pino = require('pino');

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

const logErrors = (err, req, res, next) => {
    if (err) {
        console.error(err.stack);
        res.status(500);
    }
};

module.exports = {
    logErrors,
    logger,
};
