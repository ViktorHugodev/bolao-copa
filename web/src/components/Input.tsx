import { FormEvent, useState } from 'react'
import { api } from '../lib/apiClient'

export function FormInput() {
  const [title, setTitle] = useState('')
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pool', {
        title: title,
      })
      console.log('🚀 ~ file: Input.tsx:13 ~ handleSubmit ~ response', response)
      const { code } = response.data
      // await navigator.clipboard.writeText(code)
      // alert(
      //   'Bolão criado com sucesso, o código foi copiado para a área de transferência'
      // )
    } catch (error) {
      console.log(error)
      // alert('Erro, tente novamente mais tarde.')
    }
  }
  return (
    <div className='flex h-14 w-full gap-2 flex-col'>
      <form className='flex' onSubmit={handleSubmit}>
        <input
          required
          className='bg-gray-800 px-6 py-4 flex-1 rounded text-sm border border-gray-600 text-gray-100'
          type='text'
          placeholder='Qual nome do seu bolão?'
          onChange={event => setTitle(event.target.value)}
          value={title}
        />

        <button
          className='bg-yellow-500 hover:bg-yellow-600 px-6 py-4 text-gray-900 font-bold w-44 rounded uppercase text-sm whitespace-nowrap'
          type='submit'
        >
          CRIAR MEU BOLÃO
        </button>
      </form>

      <p className='text-gray-300 text-sm mt-4 leading-relaxed'>
        Após criar seu bolão, você receberá um código único que poderá usar para
        convidar outras pessoas 🚀
      </p>
    </div>
  )
}
