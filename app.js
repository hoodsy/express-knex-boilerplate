require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const pino = require('pino-http');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple');
const dotenv = require('dotenv');
dotenv.config();

const util = require('./src/util/index');
const user = require('./src/routes/user');
const auth = require('./src/services/auth');
auth(passport);

const app = express();
const pgStore = pgSession(session);

// ---
// Middleware
// ------------------------
app.use(helmet());
app.use(pino({ logger: util.logger }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use('*', cors());

// ---
// Auth
// ------------------------
app.use(
    session({
        store: new pgStore({
            createTableIfMissing: true,
            conString: process.env.DATABASE_URL,
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    })
);
app.use(passport.initialize());
app.use(passport.session());

// ---
// Routes
// ------------------------
app.use('/api/user', user);

// ---
// Error handling
// ------------------------
app.use(util.logErrors);

module.exports = app;
