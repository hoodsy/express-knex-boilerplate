require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const pino = require('pino-http');

const util = require('./src/util/index');
const users = require('./src/routes/users');

const app = express();
const PORT = 4000;

app.use(helmet());
app.use(pino({ logger: util.logger }));
app.use(bodyParser.json());
app.use('*', cors());

app.use('/api/users', users);

app.use(util.logErrors);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
