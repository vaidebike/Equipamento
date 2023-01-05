/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import { Config, JsonDB } from 'node-json-db';

import { router } from './routes';

export const app = express();
app.disable('x-powered-by');

const port = process.env.PORT ?? 4000;

export let db = new JsonDB(new Config('database', true, true, '/'));

if (process.env.NODE_ENV === 'test') {
  db = new JsonDB(new Config('database.tests.json', true, true, '/'));
}

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

export const server =
  process.env.NODE_ENV !== 'test' &&
  app.listen(port, () => {
    console.log('Server started on port 4000!');
  });

app.use(express.json());

app.use(router);
