import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino-http';
import passport from 'passport';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import dotenv from 'dotenv';
dotenv.config();

import util from './util/index';
import user from './routes/user';
import auth from './services/auth';
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
        secret: process.env.SESSION_SECRET ?? 'secret',
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

export default app;
