
const puppeteer = require('puppeteer')
const screenshot = 'shopping.png'
const fs = require("fs");
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false,defaultViewport: false,
        args: ["--start-maximized"]})
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.ajio.com/', { waitUntil: 'networkidle2' })
    await page.waitForSelector('input[name="searchVal"]');
    await page.type('input[name="searchVal"]',"shoes");
    await  page.waitForSelector('button.rilrtl-button');
    await page.keyboard.press('Enter');
    await page.waitForSelector('div.preview');
    //  let data = await page.$$('div.preview div');
    //  console.log(data);
    let storeLinks=await page.$$eval('img.rilrtl-lazy-img.rilrtl-lazy-img-loaded', postLinks => postLinks.map(data =>
        {
            return {
                'imgSrc': data.src,
                'imgAlt':data.alt
            }
        }));
   console.log(storeLinks);
   fs.writeFile('./data/storeLinks.json', JSON.stringify(storeLinks), err => err ? console.log(err): null);
  })()
} catch (err) {
  console.error(err)
}   