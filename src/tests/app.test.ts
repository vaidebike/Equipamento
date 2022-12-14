import request from 'supertest';
import { server } from '../app';
describe('Get Endpoints', () => {
  it('Should be able to get', async () => {
    const res = await request(server).get('/').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});
afterAll((done) => {
  // close server conection
  server.close();
  done();
});
