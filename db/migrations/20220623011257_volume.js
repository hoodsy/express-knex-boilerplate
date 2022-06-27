/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('market_rental_prices', (t) => {
        t.integer('volume').nullable(); // calculated by tnt's function
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('market_rental_prices', (t) => {
        t.integer('volume'); // calculated by tnt's function
    });
};
