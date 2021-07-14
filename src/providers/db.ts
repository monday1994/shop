import { createConnection } from 'typeorm';
import { User } from '../entities/User';
import { Product } from '../entities/Product';

export const initDbConnection = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'shop-db',
      entities: [User, Product],
    });

    await connection.synchronize();
    console.log('db connected successfully');
  } catch (err) {
    console.log('err while connecting with db = ', err);
  }
};
