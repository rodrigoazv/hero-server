import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './helpers/error';
import routes from './routes';

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONT_END_ALLOW }));

app.use(
  session({
    secret: process.env.SECRET || 'pou',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 },
  }),
);

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
