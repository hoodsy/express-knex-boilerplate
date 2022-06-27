const Model = require('../../db/model');

class Users extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username'],
            properties: {
                id: { type: 'string' },
                username: { type: 'string' },
            },
        };
    }

    // https://dev.to/aspittel/objection--knex--painless-postgresql-in-your-node-app--6n6
    // static get relationMappings() {
    //     return {
    //         user_rentals: {
    //             relation: Model.HasManyRelation,
    //             modelClass: UserRentalListings,
    //             join: {
    //                 from: 'users.id',
    //                 to: 'user_rental_listings.users_id',
    //             },
    //         },
    //     };
    // }
}

module.exports = Users;
