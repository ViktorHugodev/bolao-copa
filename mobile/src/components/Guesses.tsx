import { Box, useToast, FlatList } from 'native-base'
import { useEffect, useState } from 'react'
import { api } from '../service/api'
import { Game } from '../components/Game'
import { Loading } from './Loading'
import { EmptyMyPoolList } from './EmptyMyPoolList'
import { Share } from 'react-native'

interface Props {
  poolId: string
  code?: string
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState([])
  const [firstTeamGoals, setFirstTeamGoals] = useState('')
  const [secondTeamGoals, setSecondTeamGoals] = useState('')
  const toast = useToast()
  
  async function handleSubmitGuess(gameId: string) {
    try {
      setIsLoading(true)
      if (!firstTeamGoals.trim() || !secondTeamGoals.trim()) {
        return toast.show({
          title: 'Por favor, preencha todos os campos',
          placement: 'top',
          bgColor: 'red.500',
        })
      }
      await api.post(`/pools/${poolId}/games/${gameId}`, {
        firstTeamGoals:Number(firstTeamGoals),
        secondTeamGoals: Number(secondTeamGoals)
      })
      toast.show({
        title: 'Palpite realizado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      })
      getFetchGames()
    } catch (error) {
      console.log('ERROR => ln38', error)
      toast.show({
        title: 'Não foi possível realizar esse palpite',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }
  async function getFetchGames() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.games)
      console.log('GAGMES =>', response.data.games)
    } catch (error) {
      console.log('ERROR =>', error)
      toast.show({
        title: 'Não foi possível carregar o jogo',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getFetchGames()
  }, [poolId])
  
  async function handleCodeShare() {
    await Share.share({
      message: code,
    })
  }

  if(isLoading) return <Loading/>
  
  return (
    <FlatList
      data={games}
      keyExtractor={key => key.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamGoals}
          setSecondTeamPoints={setSecondTeamGoals}
          onGuessConfirm={() =>handleSubmitGuess(item.id)}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} onShare={handleCodeShare}/> }
    />
  )
}
