export default {
  server: {
    port: 5000,
    host: 'localhost',
  },
  db: {
    postgrePort: 5432,
    dbName: 'shop-db',
    dbUsername: 'postgres',
    dbPassword: 'secret',
    dbHost: 'localhost',
  },
  auth: {
    tokenSecret: 'long-secret',
    tokenExpire: 3600, // should be 10 mins
    refreshTokenSecret: 'token-secret',
    refreshTokenExpire: 3600 // 60 mins
  }
};
