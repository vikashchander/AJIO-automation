require('dotenv').config()
const puppeteer = require('puppeteer')
const screenshot = process.env.SCREENSHOT;
const website =process.env.LINK
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(website, { waitUntil: 'networkidle2' })
    await page.waitForSelector('input[name="searchVal"]');
    await page.type('input[name="searchVal"]',"shoes");
    await  page.waitForSelector('button.rilrtl-button');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    await page.screenshot({ path:'./screenshot/'+`${screenshot}` },{ waitUntil: 'networkidle2' }  )
    // await browser.close()
     
    console.log('See screen shot: ');
    await page.close();

    await browser.close();
  })()
} catch (err) {
  console.error(err)
}   