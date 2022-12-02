import { Loading } from './Loading'

interface IButton {
  title: string
  handleJoinPool: () => void
  isLoading: boolean
}

export function Button({ title, handleJoinPool, isLoading }: IButton) {
  return (

      <button
        className='bg-yellow-500 w-[220px] hover:bg-yellow-600 px-6 py-4 flex-1 text-gray-900 font-bold rounded uppercase text-sm whitespace-nowrap'
        onClick={handleJoinPool}
      >
        {
        isLoading ? 
        <Loading/>
        :
        title
        }
     
      </button>

  )
}
