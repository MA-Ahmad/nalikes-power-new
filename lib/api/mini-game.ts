import { api } from '@/lib/axios'

// Backend response format
export interface GameListResponse {
  code: number
  msg: string
  data: {
    glist: GameItem[]
  }
}

export interface GameItem {
  gameid: string
  name: string
  platform: number
  gametype: number
  status: number
}

// Transformed format for component use
export interface Game {
  gameid: string
  name: string
  slug: string // lowercase name for SVG path
  platform: number
  gametype: number
  status: number
}

// Enter game request
export interface EnterGameRequest {
  gameid: string
  currency: string
  screen_mode: number
}

// Enter game response format
export interface EnterGameResponse {
  code: number
  msg: string
  data: {
    gameurl: string
  }
}

// Map backend game names to SVG slugs
const GAME_NAME_TO_SLUG: Record<string, string> = {
  BlackJack: 'blackjack',
  Roulette: 'roulette',
  mines: 'mines',
  plinko: 'plinko',
  dice: 'dice',
  crash: 'crash',
}

export const miniGameApi = {
  // Get games list
  getGamesList: async (): Promise<Game[]> => {
    const response = await api.post<GameListResponse>('/mini-game/games/list')

    // Transform API response to component format
    return response.data.data.glist
      .filter((game) => game.status === 1) // Only active games
      .map((game) => ({
        gameid: game.gameid,
        name: game.name,
        slug: GAME_NAME_TO_SLUG[game.name] || game.name.toLowerCase(),
        platform: game.platform,
        gametype: game.gametype,
        status: game.status,
      }))
  },

  // Enter game
  enterGame: async (data: EnterGameRequest): Promise<string> => {
    const response = await api.post<EnterGameResponse>('/mini-game/enter', data)
    return response.data.data.gameurl
  },
}
