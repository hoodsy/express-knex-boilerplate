const userService = require('../services/users');

const get = async (req, res, next) => {
    const { username } = req.params;
    let user = await userService.get({ username });

    if (!user?.id) {
        user = await userService.create({ username });
    }

    const earningsObj = await userService.getEarnings({
        users_id: user.id,
    });
    user.stats = earningsObj;

    res.send(user);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const user = await Users.query().where('id', id);

    res.send(user);
};

module.exports = { get, getById };
