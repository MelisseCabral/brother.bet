import puppeteer from 'puppeteer';

export default class Scrapper {
  static async getPageHTML(url, date = null) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    if(date){

    }

    const content = await page.content();

    await browser.close();
    return content;
  }
}
