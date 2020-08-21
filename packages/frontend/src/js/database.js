export default class Database {
  constructor(api) {
    this.api = api;
  }

  async getBundle(year = '2020') {
    try {
      const response = await this.api.get(`/fifaArena?year=${year}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async getData(date = '2020.03.01') {
    try {
      const response = await this.api.get(`/fifaArenaDates?date=${date}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async getDays(year = '2020') {
    try {
      const response = await this.api.get(`/fifaArenaDays?year=${year}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async getConsistency(type = 'whole') {
    try {
      const response = await this.api.get(`/databaseConsistency?type=${type}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async postConsistency(data, type = 'whole') {
    try {
      const response = await this.api.post(`/databaseConsistency?type=${type}`, data);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
}
