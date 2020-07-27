import axios from 'axios';

export default class Api {
  constructor(origin) {
    this.origin = origin;
    this.api = this.setApi();
  }

  setApi() {
    axios.create({
      baseURL: this.origin,
    });
  }
}
