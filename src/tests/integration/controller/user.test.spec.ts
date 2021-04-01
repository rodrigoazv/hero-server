/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import Application from '../../../app';

describe('User CRUD tests', () => {
  it('it should be return a user created and status 200', async () => {
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
    expect(response.status).toBe(200);
  });
});
