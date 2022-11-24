import { useEffect, useState } from 'react'
import { SSRAuth } from '../authRoutes/SSRAuth'
import { setupAPIClient } from '../lib/api'
import { api } from '../lib/apiClient'
import { Game } from './Game'

interface IGameCard {
  poolId: string
  code?: string
}
interface IGame {
  game: any
}


export function GameCard({ poolId }: IGameCard) {
  const [isLoading, setIsLoading] = useState(false)
  const [games, setGames] = useState<any>()

  async function getFetchGames() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.games)
      console.log('GAGMES =>', response.data.games)
    } catch (error) {
      console.log('ERROR =>', error)
      // toast.show({
      //   title: 'Não foi possível carregar o jogo',
      //   placement: 'top',
      //   bgColor: 'red.500',
      // })
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getFetchGames()
  }, [poolId])
  return (
    <div>
      {games?.map(game => (
        <Game 
        refectGames={getFetchGames}
        key={game.id} game={game} poolId={poolId}/>
      ))}
    </div>
  )
}
