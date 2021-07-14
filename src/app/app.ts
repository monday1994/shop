import express from 'express';
import { mountRoutes } from '../providers/routes';
import { genericExceptionHandler } from './exceptions/exceptionsHandler';
import {initDbConnection} from '../providers/db';

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//all routes mount
app = mountRoutes(app, '/api/v1');

app.init = () => {
  // connect to db and set up other things once server gets up
  console.log('Db is up and running on port: 5000');
  initDbConnection();
};

app.use(genericExceptionHandler);

export default app;
