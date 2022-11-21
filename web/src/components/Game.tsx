import { Team } from './Team'
import { GrClose } from 'react-icons/gr'
import { getName } from 'country-list'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { Check } from 'phosphor-react'
import { useState } from 'react'
interface GuessProps {
  id: string
  gameId: string
  createdAt: string
  participantId: string
  firstTeamPoints: number
  secondTeamPoints: number
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
  // onGuessConfirm: () => void
}

export function Game({ game }: Props) {
  console.log('GAME DTA=>', game)
  const [firsTeamGoals, setFirstTeamGoals] = useState('')
  const [secondTeamGoals, setSecondTeamGoals] = useState('')
  const formattedDate = dayjs(game.date)
    .locale(ptBR)
    .format('DD [de] MMMM [de] YYYY [ás] HH:00[h]')
  console.log(`fisrt ${game.id}`,firsTeamGoals)
  console.log(`second ${game.id}`,secondTeamGoals)
  return (
    <>
      <div className='mt-10 p-4 rounded-md w-[400px] mx-auto border border-gray-600'>
        <strong className='text-center flex font-normal items-center justify-center text-gray-100'>
          {' '}
          {getName(game.firstTeamCountryCode)} vs.{' '}
          {getName(game.secondTeamCountryCode)}
        </strong>
        <span className='text-gray-300 justify-center flex'>
          {' '}
          {formattedDate}
        </span>
        <div className='flex justify-center items-center'>
          <Team 
          position='left' 
          code={game.firstTeamCountryCode} 
          value={firsTeamGoals}
          setFirstTeamPoints={setFirstTeamGoals}
          />
          <GrClose size={32} className='mx-2' />
          <Team 
          value={secondTeamGoals}
          setSecondTeamPoints={setSecondTeamGoals}
          position='right' 
          code={game.secondTeamCountryCode}
           />
        </div>
        <button className='bg-green-600 w-full flex gap-2 justify-center items-center rounded-md mt-4 hover:bg-green-700 text-white font-bold uppercase text-sm'>
          <Check size={32} />
          Confirmar palpite
        </button>
      </div>
      <div className='h-1 w-full bg-yellow-500'></div>
    </>
  )
}
