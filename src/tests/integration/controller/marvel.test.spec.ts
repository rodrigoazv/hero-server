/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { createConnection } from 'typeorm';
import app from '../../../app';

describe('Marvel get tests', () => {
  let token = '';
  beforeAll(async () => {
    await createConnection();
    await request(app).post('/user/create').send({
      firstName: 'Rodrigo',
      lastName: 'Azevedo',
      birthDay: new Date(),
      password: '123456',
      email: 'rodrigo@gmail.com',
      nickName: 'roazv',
    });
    const resp = await request(app)
      .post('/user/login')
      .send({ password: '123456', email: 'rodrigo@gmail.com' });

    token = resp.body.token;
  });

  it('it should be return a data with list of char ', async () => {
    const response = await request(app)
      .get('/char/index')
      .send({
        limit: 1,
        offset: 1,
      })
      .set({ Authorization: token });
    expect(response.body).toHaveProperty('data');
  });
  it('it should be return a data with list of comics ', async () => {
    const response = await request(app)
      .get('/comics/index')
      .send({
        limit: 1,
        offset: 1,
      })
      .set({ Authorization: token });
    expect(response.body).toHaveProperty('data');
  });

  it('it should be return a data with char ', async () => {
    const response = await request(app)
      .get('/char/index/1017100')
      .send()
      .set({ Authorization: token });
    expect(response.body).toHaveProperty('data');
  });

  it('it should be return a data with comics ', async () => {
    const response = await request(app)
      .get('/comics/index/82965')
      .send()
      .set({ Authorization: token });
    expect(response.body).toHaveProperty('data');
  });
});
