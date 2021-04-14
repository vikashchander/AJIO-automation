require("dotenv").config();
const puppeteer = require("puppeteer");
const data = process.env.DATA;
const website = process.env.LINK;
try {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      args: ["--start-maximized"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(website, { waitUntil: "networkidle2" });
    await page.waitForSelector('input[name="searchVal"]');
    await page.type('input[name="searchVal"]', data);
    await page.waitForSelector("button.rilrtl-button");
    await page.keyboard.press("Enter");
    await page.waitForSelector("a.rilrtl-products-list__link");
    let storeLinks = await page.$$eval(
      "a.rilrtl-products-list__link",
      (postLinks) => postLinks.map((link) => link.href)
    );

    console.log(storeLinks);
    const allData = storeLinks.map(async (url, i) => {
      const page = await browser.newPage();
      console.log(`loading page: ${url}`);
      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 120000,
      });
      await page.waitForSelector(".circle.size-variant-item.size-instock");

      const selectors = await page.$$(".circle.size-variant-item.size-instock");
      // console.log(selectors);
      await selectors[1].click(".circle.size-variant-item.size-instock");

      await page.waitForSelector(".btn-gold");
      await page.click(".btn-gold");

      await page.close();
    });

    Promise.all(allData).then(() => {
      browser.close();
    });
  })();
} catch (err) {
  console.error(err);
}
