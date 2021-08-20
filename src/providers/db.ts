import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { logger } from '../middlewares/logger';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { Category } from '../entities/Category';
import { Order } from '../entities/Order';

type DB_TYPE = 'postgres';

export const initDbConnection = async () => {
  try {
    const { NODE_ENV, TYPEORM_CONNECTION, TYPEORM_HOST, TYPEORM_PORT, TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE } =
      process.env;
    const connectionConfig = {
      type: TYPEORM_CONNECTION as DB_TYPE,
      // use localhost for running tests
      host: TYPEORM_HOST,
      port: parseInt(TYPEORM_PORT),
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      namingStrategy: new SnakeNamingStrategy(),
      dropSchema: false,
      entities: [User, Product, Category, Order],
      synchronize: true,
      logging: true,
    }

    if(NODE_ENV === 'test') {
      connectionConfig.host = 'localhost';
      connectionConfig.database = `${TYPEORM_DATABASE}-test`
      connectionConfig.dropSchema = true;
      connectionConfig.logging = false;
    }

    await createConnection(connectionConfig);

    logger.info(`Db ids up and running s on port: ${TYPEORM_PORT}`);
    return;
  } catch (err) {
    logger.error('err while connecting with dbd = ', err);
    return err;
  }
};
