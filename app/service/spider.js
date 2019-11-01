'use strict';
const Service = require('egg').Service;
const moment = require('moment');
const puppeteer = require('puppeteer');
class UserService extends Service {
  async spider(gid) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(arguments[0]);
    const saveId = arguments[0];
    const time = moment().format('HH:mm:ss');
    console.log(time);
    await page.goto(`http://quote.eastmoney.com/${gid}.html`);
    // await page.waitForNavigation({ timeout: 480000 });
    await page.waitFor(1000);
    const result = await page.evaluate(() => {
      const price = document.querySelector('#price9').innerText;
      const km1 = document.querySelector('#km1').innerText;
      const km2 = document.querySelector('#km2').innerText;
      const name = document.querySelector('#name').innerText;
      return {
        price,
        km1,
        km2,
        name,
        //   price
      };
    });
    await browser.close();
    await this.app.mysql.insert('gupiao', { gid: saveId, price: result.price, km1: result.km1, km2: result.km2, time, name: result.name });
    result.gid = saveId;
    return result;
  }
}
module.exports = UserService;
