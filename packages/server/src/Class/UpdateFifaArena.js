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
    while (true) {
      await this.main(initDate);
      this.delay(delay);
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
        this.delay(5);
        const response = await this.deleteDataDay(date);
        console.log(response);
      }
    }
  }

  async main(initDate = '2020-01-01') {
    try {
      const year = initDate.split('-')[0];
      const daysToFilter = await this.getDaysToFilter(year);
      console.log(daysToFilter);
      const availableDays = this.robot.getAvailableDays(daysToFilter, year, initDate);
      console.log(availableDays);
      const database = await this.robot.mountDatabase(availableDays);
      await this.updateCloud(year, database);
      const bundle = await this.getBundleCloud(year);
      return this.updateConsistency(bundle);
    } catch (error) {
      console.log(error);
      console.log('Error in main.');
      this.delay(10);
      return this.main(initDate);
    }
  }

  async getDaysToFilter(year = '2020') {
    try {
      const response = await this.api.get(`/fifaArenaDates?year=${year}`);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Error in get days.');
      this.delay(10);
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
      this.delay(10);
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
      this.delay(10);
      return this.deleteDataDay(date);
    }
  }

  async getDataDay(date) {
    try {
      const response = await this.api.get(`/fifaArenaByDate?date=${date}`);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Error in delete data day.');
      this.delay(10);
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
      this.delay(10);
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
      this.delay(10);
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
