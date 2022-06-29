const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
        },
        pool: {
            min: 5,
            max: 30,
        },
        migrations: {
            directory: './db/migrations',
        },
        seeds: {
            directory: './db/seeds',
        },
    },
    onUpdateTrigger: (table) => `
        CREATE TRIGGER ${table}_updated_at
        BEFORE UPDATE ON ${table}
        FOR EACH ROW
        EXECUTE PROCEDURE on_update_timestamp();
      `,
};
