import { Team } from './Team'
import { GrClose } from 'react-icons/gr'
import { getName } from 'country-list'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { Check } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { api } from '../lib/apiClient'
import { toast,ToastContainer } from 'react-toastify'
interface GuessProps {
  id: string
  gameId: string
  createdAt: string
  participantId: string
  firstTeamGoals: number
  secondTeamGoals: number
}

export interface GameProps {
  id: string
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  bet: null | GuessProps
  date: string
}

interface Props {
  game: GameProps
  poolId: string
  refectGames: () => void
}

export function Game({ game, poolId,refectGames }: Props) {

  const [firsTeamGoals, setFirstTeamGoals] = useState('')
  const [secondTeamGoals, setSecondTeamGoals] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const formattedDate = dayjs(game.date).add(3, 'hours')
    .locale(ptBR)
    .format('DD [de] MMMM [de] YYYY [ás] HH:00[h]')


  async function handleConfirmGuess(event: FormEvent) {
    event.preventDefault()
    try {
      setIsLoading(true)
      if (!firsTeamGoals.trim() || !secondTeamGoals.trim()) {
        return toast('Por favor preencha os palpites do jogo', {
          position: 'bottom-center',
          autoClose: 2000,
          type: 'error',
          theme: 'dark',
        })
      }
      const res = await api.post(`/pools/${poolId}/games/${game.id}`, {
        firstTeamGoals: Number(firsTeamGoals),
        secondTeamGoals: Number(secondTeamGoals),
      })
      console.log('REs +> game ln 59', res.data)
      toast('Palpite enviado com sucesso ', {
        position: 'bottom-center',
        autoClose: 2000,
        type: 'success',
        theme: 'dark',
      })
      return refectGames()
    } catch (error) {
      console.log('ERROR => ln38', error.response.data.message)
      return toast(error.response.data.message, {
        position: 'bottom-center',
        autoClose: 2000,
        type: 'error',
        theme: 'dark',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className='mt-10 p-6 rounded-md w-full mx-auto border border-gray-600'>
        <strong className='text-center flex font-normal items-center justify-center text-gray-100'>
          {' '}
          {getName(game.firstTeamCountryCode)} vs.{' '}
          {getName(game.secondTeamCountryCode)}
        </strong>
        <span className='text-gray-300 justify-center flex'>
          {' '}
          {formattedDate}
        </span>
        <form onSubmit={handleConfirmGuess}>
          <div className='flex justify-center items-center'>
            <Team
              position='left'
              code={game.firstTeamCountryCode}
              value={game.bet ? String(game.bet.firstTeamGoals) : firsTeamGoals}
              setFirstTeamPoints={setFirstTeamGoals}
            />
            <GrClose size={32} className='mx-2' />
            <Team
              value={game.bet ? String(game.bet.secondTeamGoals) : secondTeamGoals}
              setSecondTeamPoints={setSecondTeamGoals}
              position='right'
              code={game.secondTeamCountryCode}
            />
          </div>

          {!game.bet && (
            <button
              type='submit'
              className='bg-green-600 w-full flex gap-2 justify-center items-center rounded-md mt-4 hover:bg-green-700 text-white font-bold uppercase text-sm'
            >
              <Check size={32} />
              Confirmar palpite
            </button>
          )}
        </form>
      </div>
      <div className='h-1 w-full bg-yellow-500'>
      <ToastContainer />
      </div>
    </>
  )
}
