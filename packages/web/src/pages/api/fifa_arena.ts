import { NowRequest, NowResponse } from '@vercel/node'
import Scrapper from './BotFifaArena/Scrapper'
import ServiceFifaArena from './BotFifaArena/ServiceFifaArena'

export default async (resquest: NowRequest, response: NowResponse) => {
  try {
    const result = await ServiceFifaArena.updateFifaArena()
    response.status(result.code).json(result.data);
  } catch (error) {
    response
      .status(500)
      .json({
        message: 'Estamos com indisponibilidade no momento, tente novamente mais tarde!',
        ...error,
      })
  }
}
