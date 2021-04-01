// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import Application from '../../../app';

describe('Welcome Teste', () => {
  it('it should be return a message', async () => {
    const response = await request(Application.express).get('/');
    expect(response.status).toBe(200);
  });
});
