/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571839926802_5356';
  config.security = {
    csrf: {
      enable: false, // 自定义请求头
    },
  };
  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  exports.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'cheng924633',
      // database
      database: 'egg',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  exports.keys = '老子牛皮';

  return {
    ...config,
    ...userConfig,
  };
};
