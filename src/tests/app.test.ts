import request from 'supertest';
import { app } from '../app';

jest.setTimeout(30000);

describe('Get Endpoints', () => {
  it('Should be able to get', async () => {
    const res = await request(app).get('/').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});
