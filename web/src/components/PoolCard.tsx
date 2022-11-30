import Link from 'next/link'

import { ParticipantsAvatar } from './ParticipantsAvatar'

export function PoolCard({ data }: any) {
  console.log('DATa =>', data)
  const shortName = data.owner.name.split(' ')[0]
  console.log('shortName =>', shortName)
  return (
    <Link href={`pool/${data.id}`}>
      <div className='mt-10 rounded-md w-[400px] mx-auto border border-gray-600 hover:border-1 hover:border-gray-300 cursor-pointer'>
        <div className='flex py-4 px-4 gap-4 rounded-md bg-gray-800  mx-auto justify-center items-center'>
          <div className='flex flex-col'>
            <strong className='text-gray-100'>{data.title}</strong>
            <span className='text-gray-200'>{data.owner.name}</span>
          </div>
          <ParticipantsAvatar participants={data.participants} />
        </div>
        <div className='h-1 w-full bg-yellow-500'></div>
      </div>
    </Link>
  )
}
