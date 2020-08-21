module.exports = class UpdateFifaArena {
  constructor(Api, RobotFifaArena) {
    this.baseUrl = 'https://brother.bet';
    // this.baseUrl = 'http://localhost:5000';

    this.api = new Api(this.baseUrl).api;
    this.robot = new RobotFifaArena();

    this.loop('2020-01-01', 600);
  }

  async loop(initDate, delay) {
    while (true) {
      await this.main(initDate);
      this.delay(delay);
    }
  }

  async main(initDate = '2020-01-01') {
    try {
      const year = initDate.split('-')[0];
      const daysToFilter = await this.getDaysToFilter(year);
      const database = await this.robot.main(daysToFilter, year, initDate);
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

  delay(timeSeconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeSeconds * 1000);
    });
  }
};
