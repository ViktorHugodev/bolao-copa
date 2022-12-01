import { useToast } from '@chakra-ui/toast'
import { useState } from 'react'
import { SSRAuth } from '../authRoutes/SSRAuth'
import { Button } from '../components/Button'
import { PoolCard } from '../components/PoolCard'
import { setupAPIClient } from '../lib/api'
import { api } from '../lib/apiClient'
import { ToastContainer, toast } from 'react-toastify'
interface IPoolsPage {
  pools: any
}

export default function MyPools({ pools }: IPoolsPage) {
  console.log('🚀 ~ file: mypools.tsx ~ line 9 ~ MyPools ~ pools', pools)
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  async function handleJoinPool() {
    try {
      setIsLoading(true)
      if (!code.trim()) {
        console.log('AQUI')
        return toast('Informe o código do bolão ', {
          position: 'bottom-center',
          autoClose: 2000,
          type: 'error',
          theme: 'dark',
        })
      }
      const res = await api.post('/pool/join', {
        code,
      })
      console.log(
        '🚀 ~ file: mypools.tsx ~ line 31 ~ handleJoinPool ~ res',
        res
      )

      toast('Você entrou nesse bolão', {
        position: 'bottom-center',
        autoClose: 2000,
        type: 'success',
        theme: 'dark',
      })
      setCode('')
    } catch (error) {
      console.log(
        '🚀 ~ file: Find.tsx ~ line 13 ~ handleJoinPool ~ error',
        error
      )
      setIsLoading(false)
      if (error.response?.data?.message === 'Pool not found') {
        return toast('Bolão não encontrado', {
          position: 'bottom-center',
          autoClose: 2000,
          type: 'error',
          theme: 'dark',
        })
      }

      if (error.response?.data?.message === 'You already joined this pool') {
        return toast('Você já participa desse bolão', {
          position: 'bottom-center',
          autoClose: 2000,
          type: 'error',
          theme: 'dark',
        })
      }

      toast('Erro, tente novamente mais tarde.', {
        position: 'bottom-center',
        autoClose: 2000,
        type: 'error',
        theme: 'dark',
      })
    }
  }
  return (
    <div className='mx-auto w-full flex flex-col items-center mt-10 px-4'>
      <div className='flex max-sm:flex-col max-sm:gap-2'>
        <input
          required
          className='bg-gray-800 px-6 py-4 flex-1 rounded text-sm border border-gray-600 text-gray-100'
          type='text'
          placeholder='Digite o código do bolão'
          onChange={event => setCode(event.target.value)}
          value={code}
        />

        <Button
          title='Buscar bolão por código'
          handleJoinPool={handleJoinPool}
        />
      </div>
      <div className='flex flex-col'>
        {pools.map(pool => {
          return <PoolCard key={pool.id} data={pool} />
        })}
      </div>

      <ToastContainer />
    </div>
  )
}
export const getServerSideProps = SSRAuth(async context => {
  const apiClient = setupAPIClient(context)
  const pools = await apiClient.get('/pools')
  console.log(
    '🚀 ~ file: mypools.tsx ~ line 12 ~ getServerSideProps ~ user',
    pools.data
  )

  return {
    props: {
      pools: pools.data.pools,
      // user: user?.data.user,
    },
  }
})
