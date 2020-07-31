export default class Api {
  constructor(axios, newOrigin) {
    this.newOrigin = newOrigin;
    this.axios = axios;
    this.api = this.setApi();
  }

  setApi() {
    return this.axios.create({
      baseURL: this.newOrigin,
    });
  }
}
