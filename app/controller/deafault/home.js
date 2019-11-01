'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.app.mysql.get('blog_content', {});
    console.log(result);
    this.ctx.body = result;
  }
  async getArticleList() {
    const sql = 'SELECT *' + 'FROM article LEFT JOIN TYPE ON article.type_id=type.Id';
  }
  async spider() {
    const { ctx } = this;
    // const id = 'zs000001';
    const spider = await ctx.service.spider.spider(this.ctx.params.gid);
    this.ctx.body = spider;
  }
  async search() {
    const { ctx } = this;
    // const id = 'zs000001';
    const find = await ctx.service.search.find(this.ctx.params.gid);
    this.ctx.body = find;
  }
  async zhzs() {
    const { ctx } = this;
    // const id = 'zs000001';
    const add = await ctx.service.zhzs.add(this.ctx.params.gid);
    this.ctx.body = add;
  }
  async getZhzs() {
    const { ctx } = this;
    // const id = 'zs000001';
    const get = await ctx.service.zhzs.get(this.ctx.params.gid);
    this.ctx.body = get;
  }
  async jk() {
    const { ctx } = this;
    const gid = ctx.request.body.gid;

    const add = await ctx.service.gids.add(gid);
    this.ctx.body = add;
  }
  async jkget() {
    const { ctx } = this;
    const get = await ctx.service.gids.get();
    this.ctx.body = get;
  }
}

module.exports = HomeController;
