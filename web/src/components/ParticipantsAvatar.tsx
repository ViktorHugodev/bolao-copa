import Image from 'next/image'
export function ParticipantsAvatar({ participants }) {
  console.log('Participants', participants)
  return (
    <div className='flex items-center'>
      {participants.map(participant => (
        // <img
        //   key={participant.id}
        //   className='w-8 rounded-full'
        //   src={participant?.user?.avatarUrl}
        //   alt=''
        // />
        <Image 
        key={participant.id}
        width={32}
        height={32}
        className='mr-2 rounded-full' 
        src={participant?.user.avatarUrl} alt='' />
      ))}
      <div className='w-8 rounded-full flex items-center justify-center py-1 px-1 bg-gray-200'>
        +{participants.length}
      </div>
    </div>
  )
}
