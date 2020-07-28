import axios from 'axios';

export default class Api {
  constructor(newOrigin) {
    this.newOrigin = newOrigin;
    this.api = this.setApi();
  }

  setApi() {
    return axios.create({
      baseURL: this.newOrigin,
    });
  }
}
