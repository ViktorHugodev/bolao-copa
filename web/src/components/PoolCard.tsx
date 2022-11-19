import { ParticipantsAvatar } from './ParticipantsAvatar'

export function PoolCard() {
  return (
    <div className='my-10 rounded-md w-[400px] mx-auto border border-gray-600 hover:border-2 hover:border-gray-300 cursor-pointer'>
      <div className='flex py-4 px-4 gap-4 rounded-md bg-gray-800  mx-auto justify-center items-center'>
        <div className='flex flex-col'>
          <strong className='text-gray-100'>Bolão do cuzão</strong>
          <span className='text-gray-200'>Criado por Cirilo</span>
        </div>
        <ParticipantsAvatar />

      </div>
        <div className='h-1 w-full bg-yellow-500'></div>
    </div>
  )
}
