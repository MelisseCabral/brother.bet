export default class Database {
  constructor(api, delay) {
    // Functions
    this.delay = delay;

    this.api = api;
  }

  async getBundle(year = '2020') {
    try {
      const response = await this.api.get(`/fifaArena?year=${year}`);
      if (response.data) return response.data;
      await this.delay(2);
      return this.getBundle(year);
    } catch (error) {
      console.log(error);
      await this.delay(2);
      return this.getBundle(year);
    }
  }

  async getData(date = '2020.03.01') {
    try {
      const response = await this.api.get(`/fifaArenaDates?date=${date}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async getDays(year = '2020') {
    try {
      const response = await this.api.get(`/fifaArenaDays?year=${year}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async getConsistency(type = 'whole') {
    try {
      const response = await this.api.get(`/databaseConsistency?type=${type}`);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async postConsistency(data, type = 'whole') {
    try {
      const response = await this.api.post(`/databaseConsistency?type=${type}`, data);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
}
