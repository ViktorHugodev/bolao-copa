export function ParticipantsAvatar({participants}) {

  return (
    <div className='flex items-center'>
      <img
        className='w-8 rounded-full'
        src={participants[0]?.user.avatarUrl}
        alt=''
      />
      <img
        className='w-8 rounded-full'
        src={participants[0]?.user.avatarUrl}
        alt=''
      />
      <img
        className='w-8 rounded-full'
        src={participants[0]?.user.avatarUrl}
        alt=''
      />
      <div className='w-8 rounded-full flex items-center justify-center py-1 px-1 bg-gray-200'>+{participants.length}</div>
    </div>
  )
}
