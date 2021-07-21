import express from 'express';
import { mountRoutes } from '../providers/routes';
import { genericExceptionHandler } from './exceptions/exceptionsHandler';
import {initDbConnection} from '../providers/db';

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//all routes mount
app = mountRoutes(app, '/api/v1');

app.init = async () => {
  // connect to db and set up other things once server gets up
  await initDbConnection();
  console.log('Db connected on port 5432');
};

app.use(genericExceptionHandler);

export default app;
