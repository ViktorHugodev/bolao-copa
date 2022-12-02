import { useToast } from '@chakra-ui/toast'
import { useEffect, useState } from 'react'
import { SSRAuth } from '../authRoutes/SSRAuth'
import { Button } from '../components/Button'
import { PoolCard } from '../components/PoolCard'
import { api } from '../lib/apiClient'

interface IPoolsPage {
  poolsData: any
}

export default function MyPools() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const [pools, setPools] = useState<any>([])
  const toast = useToast()

  async function refetchGames(){
    const pools = await api.get('/pools')
    setPools(pools.data.pools)
  }

  async function handleJoinPool() {
    try {
      setIsLoading(true)
      if (!code.trim()) {
        return toast({
          title: 'Por favor digite o código do bolão.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
      await api.post('/pool/join', {
        code,
      })

      toast({
        title: 'Você entrou nesse bolão.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setCode('')
    } catch (error) {
      console.log(
        '🚀 ~ file: Find.tsx ~ line 13 ~ handleJoinPool ~ error',
        error
      )
      setIsLoading(false)
      if (error.response?.data?.message === 'Pool not found') {
        return toast({
          title: 'Bolão não encontrado',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

      if (error.response?.data?.message === 'You already joined this pool') {
        return toast({
          title: 'Você já participa desse bolão.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
      toast({
        title: 'Erro ao tentar entrar no bolão.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
      refetchGames()
    }
  }

  useEffect(() => {
    refetchGames()
  },[])

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
          isLoading={isLoading}
          title='Buscar bolão por código'
          handleJoinPool={handleJoinPool}
        />
      </div>
      <div className='flex flex-col'>
        {pools.map(pool => {
          return <PoolCard key={pool.id} data={pool} />
        })}
      </div>
    </div>
  )
}
export const getServerSideProps = SSRAuth(async context => {
  return {
    props: {
    },
  }
})
