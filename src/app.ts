import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './helpers/error';
import routes from './routes';

dotenv.config();

const app = express();

console.log(`Allow ${process.env.FRONT_END_ALLOW}`);

app.use(cors({ credentials: true, origin: process.env.FRONT_END_ALLOW }));

// at the suggestion of the eslint documentation,
// when the require module has a very specific use,
// it disables the module in the line
// eslint-disable-next-line global-require
app.use(bodyParser.json());
app.use(routes);

app.use(bodyParser.urlencoded({ extended: true }));

// eslint-disable-next-line no-unused-vars
app.use(errorHandler);

export default app;
