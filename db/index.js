const dotenv = require('dotenv');
const knex = require('knex');
const knexfile = require('../knexfile.js');

dotenv.config();
const config = knexfile[process.env.NODE_ENV];

module.exports = knex(config);
