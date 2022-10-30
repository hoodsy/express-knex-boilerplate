import { Model } from 'objection';

class User extends Model {
    static tableName = 'users';

    id!: string;
    email!: string;
    password?: string;

    static jsonSchema = {
        type: 'object',
        required: ['email'],
        properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
        },
    };

    // static relationMappings = () => ({
    // 	pets: {
    // 	  relation: Model.HasManyRelation,
    // 	  // The related model. This can be either a Model subclass constructor or an
    // 	  // absolute file path to a module that exports one.
    // 	  modelClass: Animal,
    // 	  join: {
    // 		from: 'persons.id',
    // 		to: 'animals.ownerId',
    // 	  },
    // 	},
    // })
}

export default User;
