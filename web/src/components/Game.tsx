import { Team } from './Team'
import { GrClose } from 'react-icons/gr'
import { getName } from 'country-list'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
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
  // setFirstTeamPoints: (value: string) => void
  // setSecondTeamPoints: (value: string) => void
}

export function Game({ game }: Props) {
  console.log('GAME DTA=>', game)
  const formattedDate = dayjs(game.date)
    .locale(ptBR)
    .format('DD [de] MMMM [de] YYYY [ás] HH:00[h]')
  return (
    <div className='mt-10 p-4 rounded-md w-[400px] mx-auto border border-gray-600 border-gray-300'>
      <strong className='text-center flex font-normal items-center justify-center text-gray-100'>
        {' '}
        {getName(game.firstTeamCountryCode)} vs.{' '}
        {getName(game.secondTeamCountryCode)}
      </strong>
      <span className='text-gray-300 justify-center flex'> {formattedDate}</span>
      <div className='flex justify-center items-center'>
        <Team position='left' code={game.firstTeamCountryCode} />
        <GrClose size={32} className='mx-2' />
        <Team position='right' code={game.secondTeamCountryCode} />
      </div>
      <button className='bg-green-600 w-full rounded-md mt-4 hover:bg-green-700 text-white font-bold uppercase py-2 text-sm'>Confirmar palpite</button>
    </div>
  )
}
