import { SSRAuth } from '../authRoutes/SSRAuth'
import { Button } from '../components/Button'
import { PoolCard } from '../components/PoolCard'
import { setupAPIClient } from '../lib/api'

interface IPoolsPage {
  pools: any
}

export default function MyPools({ pools }: IPoolsPage) {
  console.log('🚀 ~ file: mypools.tsx ~ line 9 ~ MyPools ~ pools', pools)
  return (
    <div className='mx-auto w-full flex flex-col items-center mt-10'>
      <div className='flex'>
        <input
          required
          className='bg-gray-800 px-6 py-4 flex-1 rounded text-sm border border-gray-600 text-gray-100'
          type='text'
          placeholder='Digite o código do bolão'
          // onChange={event => setTitle(event.target.value)}
          // value={title}
        />

        <Button title='Buscar bolão por código' />
      </div>
      {pools.map(pool => {
        return <PoolCard key={pool.id} data={pool} />
      })}
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
