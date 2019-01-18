const puppeteer = require('puppeteer');
const request = require('request-promise');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://coincheck.com/ja/chats');
  page.on('response', response => {
    response.text().then(function (textBody) {
      try {
        chats = JSON.parse(textBody).chats;
        for(let i=0; i < chats.length; i++) {
          console.log(chats[i].name + ": " + chats[i].content)
        }
        request('https://coincheck.com/api/rate/xem_jpy').then(xem=>{ console.log("NEM: " + JSON.parse(xem).rate)})
          request('https://coincheck.com/api/rate/xrp_jpy').then(xrp=>{ console.log("Ripple: " + JSON.parse(xrp).rate)})
      } catch(e) {
      }
    })
  })
  //await browser.close();
})();
