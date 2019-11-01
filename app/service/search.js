'use strict';
const _ = require('lodash');
const Service = require('egg').Service;
class Search extends Service {
  async find(gid) {
    const data = await this.app.mysql.select('gupiao', { where: { gid }, orders: [[ 'id', 'desc' ]], limit: 180 });
    return _.reverse(data);
  }
}
module.exports = Search;
