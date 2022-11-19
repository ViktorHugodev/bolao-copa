interface IButton  {
  title: string
}

export function Button({title}:IButton){
  return (
    <div>
           <button
        className='bg-yellow-500 hover:bg-yellow-600 px-6 py-4 text-gray-900 font-bold w-full rounded uppercase text-sm whitespace-nowrap'
        type='submit'
      >
        {title}
      </button>
    </div>
  )
}