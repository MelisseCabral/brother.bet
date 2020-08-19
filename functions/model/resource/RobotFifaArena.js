/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-use-before-define */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */

const amor = require('chromedriver');
const { Builder, By, Key } = require('selenium-webdriver');
const cheerio = require('cheerio');
const fs = require('fs');

class RobotFifaArena {
  async main(daysNotAvailable, year, sinceDay) {
    const url = 'http://stats.cyberarena.live/results.aspx?tab=fifa';
    const bundle = [];

    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(url);

      const availableDays = this.getAvailableDays(daysNotAvailable, year, sinceDay);

      for (const day of availableDays) {
        const page = await this.getPage(day, driver);
        const gamesResult = this.getGamesResult(page);
        const fakeId = this.hash(gamesResult, 'hash:');
        const document = this.build(day, fakeId, gamesResult);
        if (document) bundle.push(document);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await this.writeJSON(bundle);
      await driver.quit();
      return bundle;
    }
  }

  getAvailableDays(daysNotAvailable, year, sinceDay) {
    const getDaysOfYear = (year) => {
      const allDaysOfYear = [];
      for (let month = 1; month < 13; month += 1) {
        const daysOfMonth = new Date(year, month, 0).getDate();
        for (let day = 1; day < daysOfMonth + 1; day += 1) {
          const dateWithoutZeros = `${year}/${month}/${day}`;
          const newDay = new Date(dateWithoutZeros).toISOString().slice(0, 10);
          allDaysOfYear.push(newDay);
        }
      }
      return allDaysOfYear;
    };

    const getSlicedDays = (sinceDay, days) => {
      const today = new Date().toISOString().slice(0, 10);
      const distanceToSinceDay = days.indexOf(sinceDay);
      const distanceToToday = days.indexOf(today);
      const availableDays = days.slice(distanceToSinceDay, distanceToToday);
      return availableDays;
    };

    const getFilteredDays = (daysNotAvailable, daysYear) => {
      if (daysNotAvailable) {
        const daysToFilter = daysNotAvailable.map((day) => day.replace(/\./g, '-'));
        const availableDays = daysYear.filter((s) => !daysToFilter.includes(s));
        return availableDays;
      }
      return daysYear;
    };

    const addToday = (days) => {
      const today = new Date().toISOString().slice(0, 10);
      const daysAddedToday = [...days, today];
      return daysAddedToday;
    };

    const daysYear = getDaysOfYear(year);
    const daysSinceToYesterday = getSlicedDays(sinceDay, daysYear);
    const filteredDays = getFilteredDays(daysNotAvailable, daysSinceToYesterday);
    const availableDays = addToday(filteredDays);
    return availableDays;
  }

  async getPage(day = '2020-06-18', driver) {
    const id = 'tb_date';
    try {
      driver.executeScript(`document.getElementById('${id}').value='${day}'`);
      await driver.findElement(By.name(id)).sendKeys(Key.RETURN);
    } finally {
      return driver.getPageSource();
    }
  }

  hash(data, label = '') {
    const s = JSON.stringify(data) || '';
    let h = 0;
    const l = s.length;
    let i = 0;
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
    return label + h;
  }

  getGamesResult(data) {
    const $ = cheerio.load(data);
    const lines = [];

    $('table').each((i, element) => {
      if ($(element).find('caption').text().split('Cyber').length - 1 === 1) {
        $(element)
          .find('tbody')
          .find('tr')
          .each((index, tRow) => {
            if (index > 0 && $(tRow).find('td:nth-child(4)').text().split(':').length > 2) {
              const scores = this.getScores($(tRow).find('td:nth-child(4)').text());
              
              lines.push({
                time: $(tRow).find('td:nth-child(1)').text(),
                video: $(tRow).find('td:nth-child(7)').find('a').attr('href') || '#',
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

  getInParentesis(line) {
    const regExp = /\(([^)]+)\)/;
    const matches = regExp.exec(line);
    return matches[1];
  }

  getBeforeParentesis(line) {
    const endFileNameIndex = line.indexOf('(');
    return line.substring(0, endFileNameIndex);
  }

  getScores(line) {
    const firstHalf = this.getInParentesis(line)
      .split(':')
      .map((each) => Number.parseInt(each, 10));
    const secondHalf = this.getBeforeParentesis(line)
      .split(':')
      .map((each) => Number.parseInt(each, 10));
    return { firstHalf, secondHalf };
  }

  async writeJSON(content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        './model/resource/download/output.json',
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

  build(day, id, data) {
    const date = day.replace(/\-/g, '.');
    return { date, id, data };
  }
}

module.exports = RobotFifaArena;
