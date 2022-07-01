const bcrypt = require('bcrypt');

const { logger } = require('../util');
const User = require('../models/User');

const create = async ({ email, password }) => {
    logger.debug('/services/users/create');

    const hash = await bcrypt.hash(password, 10);
    const user = await User.query().insert({
        email,
        password: hash,
    });

    delete user.password;
    return user;
};

const get = async ({ email }) => {
    logger.debug('/services/users/get');

    const user = await User.query().findOne({ email });

    delete user.password;
    return user;
};

const getAuth = async ({ email }) => {
    logger.debug('/services/users/getAuth');

    const user = await User.query().findOne({ email });

    return user;
};

const getById = async ({ id }) => {
    logger.debug('/services/users/getById');

    const user = await User.query().findOne({ id });

    delete user.password;
    return user;
};

module.exports = {
    create,
    get,
    getAuth,
    getById,
};
