import app from './app';
import util from './util';

const PORT = 4000;

// ---
// Server
// ------------------------
app.listen(PORT, () => {
    util.logger.info('---');
    util.logger.info(`Server running on port: ${PORT}`);
    util.logger.info('----------------------------------');
});
