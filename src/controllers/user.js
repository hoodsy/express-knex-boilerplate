const UserService = require('../services/user');

const login = async (req, res) => {
    const { user } = req;
    res.json(user);
};

const create = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.create({ email, password });

    res.send(user);
};

const get = async (req, res) => {
    const { email } = req.params;

    let user = await UserService.get({ email });

    res.send(user);
};

module.exports = { get, create, login };
