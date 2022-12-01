import { FormEvent, useState } from 'react'
import { api } from '../lib/apiClient'
import ModalCopy from './ModalCopy'
import { toast } from 'react-toastify'
import { Loading } from './Loading'

export function FormInput() {
  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    try {
      const response = await api.post('/pool', {
        title: title,
      })
      console.log('🚀 ~ file: Input.tsx:13 ~ handleSubmit ~ response', response.data)
      const { code:copeapi } = response.data
      setCode(copeapi)
      console.log('code', code)
 
        setIsOpen(true)

      
   
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex h-14 w-full gap-2 flex-col px-4'>
      <h1 className='mt-15 max-sm:mt-2 max-sm:text-2xl mt-10 text-white font-bold text-3xl max-sm:text-center leading-tight'>
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </h1>
      <form
        className='flex max-sm:flex-col max-sm:px-4 max-sm:gap-4 mt-10 max-sm:mt-4'
        onSubmit={handleSubmit}
      >
        <input
          required
          className='bg-gray-800 px-6 py-4 flex-1 rounded text-sm border border-gray-600 text-gray-100'
          type='text'
          placeholder='Qual nome do seu bolão?'
          onChange={event => setTitle(event.target.value)}
          value={title}
        />

        <button
          className='bg-yellow-500 hover:bg-yellow-600 px-6 py-4  text-gray-900 font-bold rounded uppercase text-sm whitespace-nowrap'
          type='submit'
        >
          {isLoading ? <Loading /> : 'CRIAR MEU BOLÃO'}
        </button>
      </form>
      <p className='text-gray-300 text-sm mt-4 leading-relaxed text-center'>
        Após criar seu bolão, você receberá um código único que poderá usar para
        convidar outras pessoas 🚀
      </p>

      {!isLoading &&   <ModalCopy isOpen={isOpen} setIsOpen={setIsOpen} code={code} />}
    
    </div>
  )
}
