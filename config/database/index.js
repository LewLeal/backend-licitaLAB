const { Sequelize } = require("sequelize");
const getConfig = require("config/database/getConfig");

/**
 * Function that return object connection to database
 * @return {Sequelize}
 */
const createConnection = function() {
  const data = getConfig(process.env.NODE_ENV);
  return new Sequelize(data);
};

const database = createConnection(); 
module.exports = database;
