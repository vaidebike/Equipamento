/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import { Config, JsonDB } from 'node-json-db';

import { router } from './routes';

export const app = express();
app.disable('x-powered-by');

export const db = new JsonDB(new Config('database', true, true, '/'));

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

export const server =
  process.env.NODE_ENV !== 'test' &&
  app.listen(4000, () => {
    console.log('Server started on port 4000!');
  });

app.use(express.json());

app.use(router);
