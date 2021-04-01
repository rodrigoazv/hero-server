/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { createConnection } from 'typeorm';
import Application from '../../../app';

describe('User CRUD tests', () => {
  beforeAll(async () => {
    await createConnection();
  });
  it('it should be return a user created', async () => {
    const response = await request(Application.express)
      .post('/user/create')
      .send({
        firstName: 'Rodrigo',
        lastName: 'Azevedo',
        birthDay: new Date(),
        password: '123456',
        email: 'rodrigo@gmail.com',
        nickName: 'roazv',
      });
    expect(response.body).toHaveProperty('user');
  });
  it('it should be return a user created fail', async () => {
    const response = await request(Application.express)
      .post('/user/create')
      .send({
        firstName: 'Rodrigo',
        lastName: 'Azevedo',
        birthDay: new Date(),
        password: '123456',
        nickName: 'roazv',
      });
    expect(response.body).toHaveProperty('errors');
  });
});
