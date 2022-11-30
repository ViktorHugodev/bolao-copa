import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SSRAuth } from '../../authRoutes/SSRAuth'
import { GameCard } from '../../components/GameCard'
import { ParticipantsAvatar } from '../../components/ParticipantsAvatar'
import { setupAPIClient } from '../../lib/api'

interface IPool {
  code: string
  id: string
  owner: {
    id: string
    name: string
  }
  participants: {
    id: string
    user: {
      avatarUrl: string
    }
  }
  _count: {
    participants: number
  }
  title: string
}

type PoolProps = {
  poolsDetails: IPool
}

export default function Pool({ poolsDetails }: PoolProps) {
  console.log('poolsDetails',poolsDetails)
  const [isLoading, setIsLoading] = useState(false)
  const [details, setDetails] = useState()
  const { query } = useRouter()

  async function getDataPoolDetails() {
    try {
      setIsLoading(true)
    } catch (error) {
      console.log('🚀 ~ line 25  ~ error', error)
      // toast.show({
      //   title: 'Não foi possível carregar os dados do bolão!',
      //   placement: 'top',
      //   bgColor: 'red.500',
      // })
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getDataPoolDetails()
  }, [query.id, poolsDetails._count])
  return (
    <>
      <div className='mx-auto w-[600px] mt-5 h-16 flex px-10 justify-center items-center bg-gray-900 rounded-md'>
        <div>
          <h2 className='text-gray-100'>{poolsDetails.title}</h2>
          <strong className='text-gray-400 text-sm font-normal'>Código {poolsDetails.code}</strong>
        </div>
        <div className='ml-auto'>

          <ParticipantsAvatar participants={poolsDetails.participants} />
        </div>
  
      </div>
      <div className='flex items-center justify-center'>
        <GameCard poolId={query.id}/>
      </div>
    </>
  )
}

export const getServerSideProps = SSRAuth(async context => {
  const { id } = context.query
  const apiClient = setupAPIClient(context)

  const detailsResponse = await apiClient.get(`/pool/${id}`)
  console.log(
    '🚀 ~ file: [id].tsx ~ line 49 ~ getServerSideProps ~ detailsResponse',
    detailsResponse
  )

  return {
    props: {
      poolsDetails: detailsResponse.data.pool,
      // user: user?.data.user,
    },
  }
})
