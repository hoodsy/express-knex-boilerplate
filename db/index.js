const knex = require('knex');
// const dotenv = require('dotenv');
// dotenv.config();

const knexfile = require('../knexfile.js');

const config = knexfile[process.env.NODE_ENV];

module.exports = knex(config);
