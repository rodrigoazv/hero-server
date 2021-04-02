import { validator } from '../helpers/schema-validation';

export interface UserRequest {
  email: string;
  password: string;
}

const schema = {
  userRequest: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
  },
};

// eslint-disable-next-line import/prefer-default-export
export function createUserValidator(body: any) {
  validator(schema.userRequest, body);
}
