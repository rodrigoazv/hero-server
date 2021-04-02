import { validator } from '../helpers/schema-validation';

export interface UserRequest {
  email: string;
  password: string;
}

export interface UpdateUser {
  email: string;
}

export interface CreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickName: string;
  birthDay: Date;
}

const schema = {
  userCreate: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      nickName: { type: 'string' },
      birthDay: { type: 'date' },
    },
    required: ['email', 'password'],
  },
  userRequest: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
  },
  userUpdate: {
    type: 'object',
    properties: {
      email: { type: 'string' },
    },
    required: ['email'],
  },
};

// eslint-disable-next-line import/prefer-default-export
export function createUserValidator(body: any) {
  validator(schema.userRequest, body);
}
export function loginUserValidator(body: any) {
  validator(schema.userRequest, body);
}
export function updateUserValidator(body: any) {
  validator(schema.userUpdate, body);
}
