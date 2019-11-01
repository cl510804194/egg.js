'use strict';
const Subscription = require('egg').Subscription;
const moment = require('moment');
// moment.locale('zh-cn');
class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1m', // 隔单位 m 分 、  s 秒、  ms  毫秒
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true, // 配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务。
      disable: false, // 配置该参数为 true 时，这个定时任务不会被启动。
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const ctx = this.ctx;
    const result = await ctx.service.gids.get();
    const hour = moment().hour();
    const minute = moment().minute();
    console.log(minute);
    console.log(hour);
    if ((hour >= 9 && hour <= 11) || (hour >= 13 && hour <= 15)) {
      if (hour == 9 && minute < 30) {
        return;
      } else if (hour == 11 && minute > 30) {
        return;
      }
      await result.forEach(element => {
        this.ctx.service.spider.spider(element.gid);
      });
    } else {
      console.log('当前时间段休市停止爬虫');
    }
    // if (!hour >= 15 || hour < 9) {

    // } else {
    //   console.log('当前时间段休市停止爬虫');
    // }
  }
}

module.exports = UpdateCache;
