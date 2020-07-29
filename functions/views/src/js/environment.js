export default class Environment {
  constructor(origin) {
    // Constants
    this.originDev = ['http://localhost:8080', 'http://127.0.0.1:5500'];
    this.originSever = 'http://localhost:5000';

    // Variables
    this.origin = origin;
    this.developerMode = this.setDeveloperMode();
    this.newOrigin = this.setOrigin();
  }

  setDeveloperMode() {
    if (this.origin === this.originDev[0] || this.origin === this.originDev[1]) return true;
    return false;
  }

  setOrigin() {
    if (this.developerMode) return this.originSever;
    return this.origin;
  }
}
