
const puppeteer = require('puppeteer')
require('dotenv').config()
const fs = require("fs");
const website =process.env.LINK
const data = process.env.FILE_NAME

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false,defaultViewport: false,
        args: ["--start-maximized"]})
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(website, { waitUntil: 'networkidle2' })
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
   await fs.writeFile('./data/'+`${data}`, JSON.stringify(storeLinks), err => err ? console.log(err): null);
   await page.close();
    await browser.close();
  })()
} catch (err) {
  console.error(err)
}   