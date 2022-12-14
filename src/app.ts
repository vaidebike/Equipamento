/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import { Config, JsonDB } from 'node-json-db';

import { router } from './routes';

const app = express();
app.disable('x-powered-by');

export const db = new JsonDB(new Config('database', true, true, '/'));

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

export const server = app.listen(3333, () => {
  console.log('Server started on port 3333!');
});

app.use(express.json());

app.use(router);
