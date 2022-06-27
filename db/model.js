const knexInstance = require('./index.js');
const addFormats = require('ajv-formats');

const { Model, AjvValidator } = require('objection');

class BaseModel extends Model {
    static createValidator() {
        return new AjvValidator({
            onCreateAjv: (ajv) => {
                addFormats(ajv);
            },
            options: {
                allErrors: true,
                strictNumbers: false,
                validateSchema: false,
                ownProperties: true,
                v5: true,
            },
        });
    }
}

BaseModel.knex(knexInstance);

module.exports = BaseModel;
