'use strict';
const Service = require('egg').Service;
class Gids extends Service {
  async add(gid) {
    const data = await this.app.mysql.insert('gids', { gid });
    return data;
  }
  async get() {
    const data = await this.app.mysql.select('gids');
    return data;
  }
}
module.exports = Gids;
