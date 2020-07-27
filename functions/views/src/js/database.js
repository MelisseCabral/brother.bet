import { origin } from './environment';
import api from './api';

class Database {
  constructor() {
    this.origin = origin;
    this.api = api(this.origin);
  }

  async getDays(year = '2020') {
    try {
      const response = await this.api.get(`/daysOfYear?year=${year}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async getSource(key, sheetId) {
    try {
      const response = await this.api.get('/source?', { params: { key, sheetId } });
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async getDatabaseConsistency(type = 'whole') {
    try {
      const response = await this.api.get(`/databaseConsistency?type=${type}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async postDatabaseConsistency(data, type = 'whole') {
    try {
      const response = await this.api.post(`/databaseConsistency?type=${type}`, data);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async getBundle(year = '2020') {
    try {
      const response = await this.api.get(`/bundle?year=${year}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async getData(year = '2020', date = '2020.03.01') {
    try {
      const response = await this.api.get(`/data?year=${year}&date=${date}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }

  async postData(data) {
    try {
      const response = await this.api.post('/data', data);
      // console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
}

export default new Database();
