/* eslint-disable import/no-extraneous-dependencies */
import { createConnection } from 'typeorm';
import request from 'supertest';
import app from '../../../app';

describe('Auth JWT integration tests', () => {
  beforeAll(async () => {
    await createConnection();
  });

  it('it should be return err because no token provider', async () => {
    const response = await request(app).get('/user/testId').send({});
    expect(response.body).toHaveProperty('error');
  });

  it('it should be return err because no token provider', async () => {
    const response = await request(app)
      .get('/user/09ace364-ee63-4259-b505-ecce86c90d23')
      .set({ Authorization: '123' })
      .send();
    expect(response.body).toHaveProperty('error');
  });
});
