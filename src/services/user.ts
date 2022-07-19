import bcrypt from 'bcrypt';

import util from '../util';
import User from '../models/User';

const create = async (email: string, password: string) => {
    util.logger.debug('/services/users/create');

    const hash = await bcrypt.hash(password, 10);
    const user = await User.query().insert({
        email,
        password: hash,
    });

    delete user.password;

    return user;
};

const get = async (email: string) => {
    util.logger.debug('/services/users/get');

    const user = await User.query().findOne({ email });

    if (user) {
        delete user.password;
    }

    return user;
};

const getAuth = async (email: string) => {
    util.logger.debug('/services/users/getAuth');

    const user = await User.query().findOne({ email });

    return user;
};

const getById = async (id: string) => {
    util.logger.debug('/services/users/getById');

    const user = await User.query().findOne({ id });

    if (user) {
        delete user.password;
    }

    return user;
};

export default {
    create,
    get,
    getAuth,
    getById,
};
