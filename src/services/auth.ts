import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

import UserService from './user';
import User from '../models/User';

export default (passport: any) => {
    passport.serializeUser((user: User, done: any) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done: any) => {
        try {
            const user = await UserService.getById(id);

            if (!user) {
                return done(null, false, {
                    message: 'User not found',
                });
            }

            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                try {
                    const user = await UserService.getAuth(email);

                    if (!user || !user.password) {
                        return done(null, false, {
                            message: 'User does not exist',
                        });
                    }

                    const isMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (isMatch) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};
