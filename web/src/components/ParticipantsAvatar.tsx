import Image from 'next/image'
export function ParticipantsAvatar({ participants }) {
  console.log('Participants', participants)
  return (
    <div className='flex items-center'>
      {participants.map(participant => (
        <Image
          key={participant.id}
          width={32}
          height={32}
          className='mr-2 rounded-full'
          src={participant?.user.avatarUrl}
          alt=''
        />
      ))}
      {participants.length - 4 > 0 && (
        <div className='w-8 rounded-full flex items-center justify-center py-1 px-1 bg-gray-200'>
          +{participants.length - 3}
        </div>
      )}
    </div>
  )
}
