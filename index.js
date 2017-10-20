const puppeteer = require('puppeteer');

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
						} catch(e) {
						}
        })
    })
    //await browser.close();
})();
