/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
module.exports = class UpdateFifaArena {
  constructor(Api, RobotFifaArena) {
    this.baseUrl = 'https://brother.bet';
    // this.baseUrl = 'http://localhost:5000';

    this.api = new Api(this.baseUrl).api;
    this.robot = new RobotFifaArena();
  }

  async loop(initDate, delay) {
    let count = 0;
    while (true) {
      await this.main(initDate);
      await this.delay(delay);
      count += 1;
      console.log(count);
    }
  }

  async main(initDate = '2020-01-01') {
    try {
      const year = initDate.split('-')[0];
      // const daysToFilter = await this.getDaysToFilter(year);
      const availableDays = this.robot.getAvailableDays('', year, initDate);
      const database = await this.robot.mountDatabase(availableDays);
      await this.updateCloud(year, database);
    } catch (error) {
      console.log(error);
      console.log('Error in main.');
      await this.delay(10);
      return this.main(initDate);
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
        await this.delay(5);
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
      await this.delay(10);
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
      await this.delay(10);
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
      await this.delay(10);
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
      await this.delay(10);
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
      await this.delay(10);
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
      await this.delay(10);
      return this.updateConsistency(bundle);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  delay(timeSeconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeSeconds * 1000);
    });
  }
};
