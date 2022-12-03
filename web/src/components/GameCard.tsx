import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { api } from '../lib/apiClient'
import { Game } from './Game'

interface IGameCard {
  poolId: any
  code?: string
}
interface IGame {
  game: any
}

export function GameCard({ poolId }: IGameCard) {

  const [isLoading, setIsLoading] = useState(false)
  const [games, setGames] = useState<any>()
  const [allGames, setAllGames] = useState<any>([])
  async function getFetchGames() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.games)
      setAllGames(response.data.allGames)
 
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
  console.log('allGames', allGames)
  useEffect(() => {
    getFetchGames()
  }, [poolId])


  return (
    <div className='w-full flex flex-col items-center justify-center mx-auto px-4'>
      {games?.map((game: any) => {

        // console.log('filtered', filteredGame)
        const formatedGameDate = dayjs(game.date)
        .format('DD/MM/YYYY')
        const today = dayjs(new Date).add(2,'day').format('DD/MM/YYYY')
        
        if (formatedGameDate < today) {
          return (
            <Game
 
              gameTest={allGames}
              refectGames={getFetchGames}
              key={game.id}
              game={game}
              poolId={poolId}
            />
          )
        }
      })}
    </div>
  )
}
