const { logger } = require('../util');
const Users = require('../models/Users');

const create = async ({ username }) => {
    logger.debug('/services/users/create');
    const user = await Users.query().insert({
        username,
        locked: false,
    });
    return user;
};

const get = async ({ username }) => {
    logger.debug('/services/users/get');
    const user = await Users.query().findOne({ username });
    return user;
};

module.exports = {
    create,
    get,
};
