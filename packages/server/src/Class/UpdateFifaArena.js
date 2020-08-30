/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
module.exports = class UpdateFifaArena {
  constructor(Api, RobotFifaArena) {
    this.baseUrl = 'https://brother.bet';
    // this.baseUrl = 'http://localhost:5000';

    this.localDatabase = [];

    this.api = new Api(this.baseUrl).api;
    this.robot = new RobotFifaArena();
  }

  async loop({ secondsOfDelay }) {
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
        await this.updateCloud(year, database);
        this.localDatabase = [...this.localDatabase, ...database];
      }

      await this.delay(secondsOfDelay);
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

  async updateLastWeek({ daysAgo }) {
    try {
      const manyDaysAgo = this.robot.getPastDays(daysAgo);
      const year = manyDaysAgo[0].split('-')[0];
      const database = await this.getDatabase(manyDaysAgo);
      await this.updateCloud(year, database);
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
    const daysToFilter = await this.getDaysToFilter(year);
    for (const day of daysToFilter) {
      const dataDay = await this.getDataDay(day);
      const { length } = dataDay.data;
      const { date } = dataDay;

      if (!length) {
        console.log('Deleting day ', date, ', with length of:', length);
        await this.delay();
        const response = await this.deleteDataDay(date);
        console.log(response);
      }
    }
  }

  async getDaysToFilter(year = '2020') {
    try {
      const response = await this.api.get(`/fifaArenaDates?year=${year}`);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Error in get days.');
      await this.delay();
      return this.getDaysToFilter(year);
    }
  }

  async updateCloud(year, database) {
    try {
      const response = await this.api.post(`/fifaArena?year=${year}`, database);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Error in update cloud.');
      await this.delay();
      return this.updateCloud(year);
    }
  }

  async deleteDataDay(date) {
    try {
      const response = await this.api.delete(`/fifaArena?date=${date}`);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Error in delete data day.');
      await this.delay();
      return this.deleteDataDay(date);
    }
  }

  async getDataDay(date) {
    try {
      const response = await this.api.get(`/fifaArenaByDate?date=${date}`);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Error in get data day.');
      await this.delay();
      return this.getDataDay(date);
    }
  }

  async getBundleCloud(year = '2020') {
    try {
      const response = await this.api.get(`/fifaArena?year=${year}`);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Error in get bundle.');
      await this.delay();
      return this.getBundleCloud(year);
    }
  }

  async updateConsistency(bundle, type = 'whole') {
    const hash = (data, label = '') => {
      const s = JSON.stringify(data) || '';
      let h = 0;
      const l = s.length;
      let i = 0;
      // eslint-disable-next-line no-bitwise, no-plusplus
      if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
      return label + h;
    };

    try {
      const hashNumber = hash(bundle);
      const document = { aggregatedSet: hashNumber };

      const response = await this.api.post(`/databaseConsistency?type=${type}`, document);
      return response.data;
    } catch (error) {
      console.log('Error in database consistency.');
      console.log(error);
      await this.delay();
      return this.updateConsistency(bundle);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  delay(timeSeconds = 10) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeSeconds * 1000);
    });
  }
};
