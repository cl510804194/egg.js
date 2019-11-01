'use strict';
const Service = require('egg').Service;
const moment = require('moment');
const puppeteer = require('puppeteer');
class UserService extends Service {
  async add(gid) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(arguments[0]);
    const saveId = arguments[0];
    const time = moment().format('HH:mm:ss');
    console.log(time);
    await page.goto(`http://quote.eastmoney.com/${gid}.html`);
    // await page.waitForNavigation({ timeout: 480000 });
    await page.waitFor(400);
    const result = await page.evaluate(() => {
      const gt1 = document.querySelector('#gt1').innerText;
      const gt2 = document.querySelector('#gt2').innerText;
      const gt3 = document.querySelector('#gt3').innerText;
      const gt4 = document.querySelector('#gt4').innerText;
      const gt5 = document.querySelector('#gt5').innerText;
      //   const gt6 = document.querySelector('#gt6').innerText;
      const gt7 = document.querySelector('#gt7').innerText;
      const gt8 = document.querySelector('#gt8').innerText;
      const gt9 = document.querySelector('#gt9').innerText;
      const gt10 = document.querySelector('#gt10').innerText;
      const gt11 = document.querySelector('#gt11').innerText;
      const name = document.querySelector('#name').innerText;
      return {
        gt1,
        gt2,
        gt3,
        gt4,
        gt5,
        // gt6,
        gt7,
        gt8,
        gt9,
        gt10,
        gt11,
        name,
        //   price
      };
    });
    await browser.close();
    await this.app.mysql.insert('zhzs', {
      gid: saveId,
      gt1: result.gt1,
      gt2: result.gt2,
      gt3: result.gt3,
      gt4: result.gt4,
      gt5: result.gt5,
      //   gt6: result.gt6,
      gt7: result.gt7,
      gt8: result.gt8,
      gt9: result.gt9,
      gt10: result.gt10,
      gt11: result.gt11,
      name: result.name,
    });
    result.gid = saveId;
    return result;
  }

  async get(gid) {
    const data = await this.app.mysql.get('zhzs', {
      where: { gid },
    });
    return data;
  }
}
module.exports = UserService;
