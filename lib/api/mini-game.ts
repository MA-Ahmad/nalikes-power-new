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

// Map game slugs to the correct game ID for the enter game API
// These are the game IDs that should be sent to the backend when entering a game
const GAME_SLUG_TO_ENTER_GAME_ID: Record<string, string> = {
  plinko: '501',
  mines: '502',
  dice: '503',
  // Add other games as needed, or they will use the gameid from the backend
}

/**
 * Get the correct game ID to use when entering a game or in URLs
 * @param slug - The game slug (e.g., 'plinko', 'mines', 'dice')
 * @param backendGameId - The game ID from the backend (fallback if no mapping exists)
 * @param gameName - Optional game name for additional matching
 * @returns The game ID to use for entering the game or in URLs
 */
export const getEnterGameId = (
  slug: string,
  backendGameId: string,
  gameName?: string
): string => {
  // Normalize slug to lowercase for matching
  const normalizedSlug = slug.toLowerCase()
  
  // First try by slug (normalized to lowercase)
  if (GAME_SLUG_TO_ENTER_GAME_ID[normalizedSlug]) {
    return GAME_SLUG_TO_ENTER_GAME_ID[normalizedSlug]
  }
  
  // If slug didn't match, try to get slug from game name and check again
  if (gameName) {
    const normalizedName = gameName.toLowerCase()
    // Check if the normalized name matches any slug in our mapping
    if (GAME_SLUG_TO_ENTER_GAME_ID[normalizedName]) {
      return GAME_SLUG_TO_ENTER_GAME_ID[normalizedName]
    }
  }
  
  // Fallback to backend game ID
  return backendGameId
}

/**
 * Get the URL game ID for a game (mapped ID for URL purposes)
 * This is the same as getEnterGameId but with a clearer name for URL usage
 */
export const getUrlGameId = getEnterGameId

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
    console.log('Entering game with payload:', JSON.stringify(data, null, 2))
    const response = await api.post<EnterGameResponse>('/mini-game/enter', data)
    console.log('Game URL received:', response.data.data.gameurl)
    return response.data.data.gameurl
  },
}
