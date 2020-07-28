export default class Environment {
  constructor(newOrigin) {
    // Constants
    this.originDevelopment = 'http://127.0.0.1:5500';
    this.serverDeveloperMode = 'http://localhost:5000';

    // Variables
    this.newOrigin = newOrigin;
    this.developerMode = this.setDeveloperMode();
    this.origin = this.setOrigin();
  }

  setDeveloperMode() {
    if (this.newOrigin === this.originDevelopment) return true;
    return false;
  }

  setOrigin() {
    if (this.developerMode) return this.originDevelopment;
    return this.newOrigin;
  }
}
