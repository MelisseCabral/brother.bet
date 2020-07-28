export default class Environment {
  constructor(origin) {
    // Constants
    this.originDevelopment = 'http://localhost:8080/';
    this.originSever = 'http://localhost:5000';

    // Variables
    this.origin = origin;
    this.developerMode = this.setDeveloperMode();
    this.newOrigin = this.setOrigin();
  }

  setDeveloperMode() {
    if (this.origin === this.originDevelopment) return true;
    return false;
  }

  setOrigin() {
    if (this.developerMode) return this.originSever;
    return this.origin;
  }
}
