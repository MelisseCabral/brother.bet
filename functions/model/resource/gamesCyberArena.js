/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-use-before-define */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
require('chromedriver');
const { Builder, By, Key } = require('selenium-webdriver');
const cheerio = require('cheerio');
const fs = require('fs');

const main = async () => {
  const url = 'http://stats.cyberarena.live/results.aspx?tab=fifa';
  const bundle = [];
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(url);
    const days = getAvailableDays();
    for (const day of days) {
      const page = await getPage(day, driver);
      const gamesResult = getGamesResult(page);
      const fakeId = hash(gamesResult, 'hash:');
      const document = build(day, fakeId, gamesResult);
      bundle.push(document);
    }
  } finally {
    await writeJSON(bundle);
    await driver.quit();
  }
};

const addZeros = (number) => {
  if (number < 10) return `0${number}`;
  return number;
};

const generateDaysOfYear = (year) => {
  const allDaysOfYear = [];
  for (let month = 1; month < 13; month += 1) {
    const daysOfMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day < daysOfMonth + 1; day += 1) {
      allDaysOfYear.push(`${year}-${addZeros(month)}-${addZeros(day)}`);
    }
  }
  return allDaysOfYear;
};

const getAvailableDays = () => {
  const days = generateDaysOfYear(2020);
  const today = new Date().toISOString().slice(0, 10);
  const startFromDay = 150;
  const distanceToYesterday = days.indexOf(today) - startFromDay;
  const availableDay = days.splice(startFromDay, distanceToYesterday);
  return availableDay;
};

const getPage = async (day = '2020-06-18', driver) => {
  const id = 'tb_date';
  try {
    driver.executeScript(`document.getElementById('${id}').value='${day}'`);
    await driver.findElement(By.name(id)).sendKeys(Key.RETURN);
  } finally {
    return driver.getPageSource();
  }
};

const hash = (data, label = '') => {
  const s = JSON.stringify(data) || '';
  let h = 0;
  const l = s.length;
  let i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return label + h;
};

function getGamesResult(data) {
  const $ = cheerio.load(data);
  const lines = [];

  $('table').each((i, element) => {
    if ($(element).find('caption').text().split('Cyber').length - 1 === 1) {
      $(element)
        .find('tbody')
        .find('tr')
        .each((index, tRow) => {
          if (
            index > 0
            && $(tRow).find('td:nth-child(4)').text().split(':').length > 2
          ) {
            const scores = getScores($(tRow).find('td:nth-child(4)').text());
            lines.push({
              teamA: {
                team: $(tRow).find('td:nth-child(2)').text(),
                user: $(tRow).find('td:nth-child(3)').text(),
                firstHalf: +scores.firstHalf[0],
                secondHalf: +scores.secondHalf[0] - +scores.firstHalf[0],
              },
              teamB: {
                team: $(tRow).find('td:nth-child(5)').text(),
                user: $(tRow).find('td:nth-child(6)').text(),
                firstHalf: +scores.firstHalf[1],
                secondHalf: +scores.secondHalf[1] - +scores.firstHalf[1],
              },
            });
          }
        });
    }
  });
  return lines;
}

const getInParentesis = (line) => {
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(line);
  return matches[1];
};

const getBeforeParentesis = (line) => {
  const endFileNameIndex = line.indexOf('(');
  return line.substring(0, endFileNameIndex);
};

const getScores = (line) => {
  const firstHalf = getInParentesis(line)
    .split(':')
    .map((each) => Number.parseInt(each, 10));
  const secondHalf = getBeforeParentesis(line)
    .split(':')
    .map((each) => Number.parseInt(each, 10));
  return { firstHalf, secondHalf };
};

async function writeJSON(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      '../database/output.json',
      JSON.stringify(content),
      'utf8',
      (err) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      },
    );
  });
}

const build = (date, id, data) => ({
  date,
  id,
  data,
});

main();
