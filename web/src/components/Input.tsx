export function FormInput() {
  return (
    <div className='flex h-14 w-full gap-2'>
      <input
        required
        className='bg-gray-800 px-6 py-4 flex-1 rounded text-sm border border-gray-600 text-gray-100'
        type='text'
        placeholder='Qual nome do seu bolão?'
        // onChange={event => setTitle(event.target.value)}
        // value={title}
      />

      <button
        className='bg-yellow-500 hover:bg-yellow-600 px-6 py-4 text-gray-900 font-bold w-44 rounded uppercase text-sm whitespace-nowrap'
        type='submit'
      >
        CRIAR MEU BOLÃO
      </button>
      <p className='text-gray-300 text-sm mt-4 leading-relaxed'>
        Após criar seu bolão, você receberá um código único que poderá usar para
        convidar outras pessoas 🚀
      </p>
    </div>
  )
}
