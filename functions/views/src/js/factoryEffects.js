// Import Globals
export default class FactoryEffects {
  static getStructure(page) {
    return new Promise((resolve) => $.when($.get(page)).done((data) => resolve(data)));
  }
}
