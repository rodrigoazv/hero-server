/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { createConnection } from 'typeorm';
import app from '../../../src/app';

describe('User CRUD tests', () => {
  beforeAll(async () => {
    await createConnection();
  });

  it('it should be return a user created', async () => {
    const response = await request(app).post('/user/create').send({
      firstName: 'Rodrigo',
      lastName: 'Azevedo',
      birthDay: new Date(),
      password: '123456',
      email: 'rodrigo@gmail.com',
      nickName: 'roazv',
    });
    expect(response.body).toHaveProperty('user');
  });

  it('should be return a user if uptade status ok', async () => {
    const response = await request(app).put('/user/update').send({
      email: 'rodrigo@gmail.com',
      nickName: 'roazvzão',
    });
    expect(response.body).toHaveProperty('user');
  });

  it('should be return a token if login status ok', async () => {
    const response = await request(app).post('/user/login').send({
      password: '123456',
      email: 'rodrigo@gmail.com',
    });
    expect(response.body).toHaveProperty('token');
  });

  it('it should be return a user created fail', async () => {
    const response = await request(app).post('/user/create').send({
      firstName: 'Rodrigo',
      lastName: 'Azevedo',
      birthDay: new Date(),
      password: '123456',
      nickName: 'roazv',
    });
    expect(response.body).toHaveProperty('error');
  });
});
