module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOSTNAME,
    dialect: process.env.DEV_DB_DIALECT,
    schema: process.env.DEV_DB_SCHEMA,
  },
  test: {
    database: process.env.CI_DB_NAME,
    store: process.env.CI_DB_STORE,
    dialect: process.env.CI_DB_DIALECT,
    schema: process.env.CI_DB_SCHEMA,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: process.env.PROD_DIALECT,
    schema: process.env.PROD_SCHEMA,
  },
};
