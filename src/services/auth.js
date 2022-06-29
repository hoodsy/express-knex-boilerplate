const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const UserService = require('./user');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserService.getById({ id });

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
                    const user = await UserService.getAuth({ email });

                    if (!user) {
                        return done(null, false, {
                            message: 'User does not exist',
                        });
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (isMatch) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    });
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};
