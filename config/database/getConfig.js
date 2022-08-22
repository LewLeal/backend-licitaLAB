const config = require("config/database/config");

/**
 * Function that get config current
 * @param {string} env
 * @return {object}
 */
const getConfig = function(env){
  return config[env] || config.development;
}

module.exports = getConfig;
