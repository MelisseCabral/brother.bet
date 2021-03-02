import Scrapper from './Scrapper'
import FactoryFifaArena from './FactoryFifaArena'

export default class ServiceFifaArena {
  constructor() {
    this.baseUrl = 'https://brother.bet'
  }

  static async updateFifaArena() {
    try {
      const contentHTML = await Scrapper.getPageHTML(
        'http://stats.cyberarena.live/results.aspx?tab=fifa21', '2021-02-01'
      )
      const data = await FactoryFifaArena.getGamesResult(contentHTML);
      // const filteredDatabase = Util.filterDatabase(data.games);
      // const [database] = await Util.getDatabase();

      return { data: { games: data }, code: 200 }
    } catch (error) {
      return {
        data: {
          message: 'Estamos com indisponibilidade no momento, tente novamente mais tarde!',
          ...error,
        },
        code: 500,
      }
    }
  }

  async getDatabase(initDate) {
    try {
      const year = Util.getToday().split('-')[0]
      const availableDays = this.robot.getAvailableDays('', year, initDate)
      const database = await this.robot.mountDatabase(availableDays)
      return database
    } catch (error) {
      console.log(error)
      console.log('Error in getDatabase.')
      await this.delay()
      return this.getDatabase(initDate)
    }
  }
}
