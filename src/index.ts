import { createConnection } from 'typeorm';
import app from './app';

const port = 3333;

createConnection().then(() =>
  app.listen(port, () => console.log(`Running on http://localhost:${port}`)),
);
