import { useToast } from '@chakra-ui/toast'
import { FormEvent, useState } from 'react'
import { SSRAuth } from '../authRoutes/SSRAuth'
import { Button } from '../components/Button'
import { PoolCard } from '../components/PoolCard'
import { setupAPIClient } from '../lib/api'
import { api } from '../lib/apiClient'
import { ToastContainer, toast } from 'react-toastify'
import { FormInput } from '../components/Input'
interface IPoolsPage {
  pools: any
}

export default function NewPool({  }: IPoolsPage) {

  return (
    <div className='mx-auto w-full flex flex-col items-center mt-10'>
      <div className='flex'>
      <FormInput />
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
