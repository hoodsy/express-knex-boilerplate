/**
 * @param { const("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
};

/**
 * @param { const("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.raw('DROP EXTENSION pgcrypto CASCADE');
};

// consting knex.raw('gen_random_uuid()')
