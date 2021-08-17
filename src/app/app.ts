import express from 'express';
import { mountRoutes } from '../providers/routes';
import { genericExceptionHandler } from './exceptions/exceptionsHandler';
import {initDbConnection} from '../providers/db';
import dotenv from 'dotenv';
import passport from 'passport';
import {applyPassportStrategy} from '../providers/passport';

dotenv.config();

const app = express();

applyPassportStrategy(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.init = async () => {
  // connect to db and set up other things once server gets up
  await initDbConnection();
  //all routes mount
  mountRoutes(app, '/api/v1');
  //exception handler have to be here, otherwise it does not catch errors
  app.use(genericExceptionHandler);
};

process.on('unhandledRejection', (err: Error) => {
  console.error('unhendled rejection error: ', err);
  throw err;
});

process.on('uncaughtException', (err: Error) => {
  console.error('uncaught exception, error: ', err);
});

export default app;
