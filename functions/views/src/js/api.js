import axios from 'axios';

export default class Api {
  constructor(origin) {
    this.origin = origin;
    this.api = this.setApi();
  }

  setApi() {
    return axios.create({
      baseURL: this.origin,
    });
  }
}
