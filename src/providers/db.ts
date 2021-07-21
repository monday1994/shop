import { createConnection } from 'typeorm';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import config from '../config/default';
export const initDbConnection = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: config.dbHost,
      port: config.postgrePort,
      username: config.dbUsername,
      password: config.dbPassword,
      database: config.dbName,
      entities: [User, Product],
    });

    return connection.synchronize();
  } catch (err) {
    console.log('err while connecting with db = ', err);
    return err;
  }
};
