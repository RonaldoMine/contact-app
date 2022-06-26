import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });
ajv.addKeyword('uniforms');

const schema = {
    title: 'Contact',
    type: 'object',
    properties: {
        fullname: { type: 'string'},
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        town: { type: 'string' },
        province: { type: 'string' },
        postal_code: { type: 'string' },
        country: { type: 'string' },
    },
    required: [
        'fullname',
        'name',
        'email',
        'phone',
        'town',
        'province',
        'postal_code',
        'country',
    ],
};

function createValidator(schema: object) {
    const validator = ajv.compile(schema);

    return (model: object) => {
        validator(model);
        return validator.errors?.length ? { details: validator.errors } : null;
    };
}

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge(schema, schemaValidator);