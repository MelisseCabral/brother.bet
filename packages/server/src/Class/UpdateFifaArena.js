/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const Util = require('@brother.bet/Util');
const Database = require('@brother.bet/Database');

module.exports = class UpdateFifaArena {
  constructor(Api, RobotFifaArena) {
    this.baseUrl = 'https://brother.bet';
    // this.baseUrl = 'http://localhost:5000';

    this.localDatabase = [];

    // Objects
    this.api = new Api(this.baseUrl).api;
    this.database = new Database(this.api);
    this.robot = new RobotFifaArena();
    this.delay = Util.delay;
  }

  async loop({ secondsOfDelay }) {
    try {
      while (true) {
        const dataLastDayLocalDatabase = this.localDatabase[this.localDatabase.length - 1];

        const today = this.robot.getToday();
        const lastDayLocalDatabase = dataLastDayLocalDatabase.date.replace(/\./g, '-');
        const timeToday = new Date(today).getTime();
        const timeLastDayLocalDatabase = new Date(lastDayLocalDatabase).getTime();

        const [database] = await this.getDatabase(today);
        const sizeTodayDatabase = database.data.length;
        const sizeLastDayLocalDatabase = dataLastDayLocalDatabase.data.length;

        if (timeToday > timeLastDayLocalDatabase || sizeTodayDatabase > sizeLastDayLocalDatabase) {
          const year = today.split('-')[0];
          await this.database.setData(year, database);
          this.localDatabase = [...this.localDatabase, ...database];
        }

        await this.delay(secondsOfDelay);
      }
    } catch (error) {
      console.log(error);
      console.log('Error in loop.');
      await this.delay();
      return this.loop(secondsOfDelay);
    }
  }

  async getDatabase(initDate) {
    try {
      const year = initDate.split('-')[0];
      const availableDays = this.robot.getAvailableDays('', year, initDate);
      const database = await this.robot.mountDatabase(availableDays);
      return database;
    } catch (error) {
      console.log(error);
      console.log('Error in getDatabase.');
      await this.delay();
      return this.getDatabase(initDate);
    }
  }

  async updateDaysAgo({ daysAgo }) {
    try {
      const manyDaysAgo = this.robot.getPastDays(daysAgo);
      const year = manyDaysAgo[0].split('-')[0];
      const database = await this.getDatabase(manyDaysAgo);
      await this.database.setData(year, database);
      this.localDatabase = [...this.localDatabase, ...database];
      return database;
    } catch (error) {
      console.log(error);
      console.log('Error in updateLastWeek.');
      await this.delay();
      return this.updateLastWeek(daysAgo);
    }
  }

  async clean(year) {
    const daysToFilter = await this.database.getDays(year);
    for (const day of daysToFilter) {
      const dataDay = await this.database.getData(day);
      const { length } = dataDay.data;
      const { date } = dataDay;

      if (!length) {
        console.log('Deleting day ', date, ', with length of:', length);
        await this.delay();
        const response = await this.database.deleteData(date);
        console.log(response);
      }
    }
  }
};
