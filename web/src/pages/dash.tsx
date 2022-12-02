import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import previewMobileImg from '../assets/app-nlw-copa-preview.png'
import checkBoxImg from '../assets/icon-check.svg'
import logoImg from '../assets/logo.svg'

import { SSRAuth } from '../authRoutes/SSRAuth'
import { FormInput } from '../components/Input'
import { IUser } from '../context/AuthContext'
import { setupAPIClient } from '../lib/api'
import { api } from '../lib/apiClient'

interface HomeProps {
  poolsCount: number
  betsCount: number
  usersCount: number
  user: IUser
}

export default function Dash() {
  const [info, setInfo] = useState<any>([])

  async function getData(){
    const [poolRequest, betsRequest, usersRequest] = await Promise.all([
      api.get('/pools/count'),
      api.get('/bets/count'),
      api.get('/users/count'),
    ])
    setInfo({
      pools:poolRequest.data.count,
      bets:betsRequest.data.count,
      users:usersRequest.data.count,
    })
  }


  useEffect(() => {
    getData()
  },[])
  return (
    <div className='max-w-6xl max-sm:mt-10 mt-10 grid grid-cols-2 max-sm:flex h-screen max-sm:items-start  mx-auto gap-28 max-sm:gap-4 px-6'>
      <main>
        <FormInput />
        <div className='flex items-center max-sm:mt-2 mt-10 gap-2 text-center justify-center'>
          {/* <Image src={usersAvatarImg} alt='Avatar de usuários' /> */}
          <strong className='text-gray-100 text-lg'>
            <span className='text-ignite-500'>+ {info?.users}</span>{' '}
            pessoas já estão usando
          </strong>
        </div>
       
        <div className='mt-10 pt-10 max-sm:border-t max-sm:flex-col border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex gap-4 items-center'>
            <Image src={checkBoxImg} alt='' />
            <div className='flex flex-col'>
              <strong className='text-2xl'>+ {info?.pools}</strong>
              <span className='font-normal'>Bolões criados</span>
            </div>
          </div>
          <div className='w-px h-14  bg-gray-600 max-sm:h-0 max-sm-w-0  ' />
          <div className='flex gap-4 max-sm:mt-10 max-sm:w-full max-sm:border-t max-sm:justify-center border-gray-600 items-center'>
            <Image src={checkBoxImg} alt='' className='max-sm:mt-12'/>
            <div className='flex flex-col max-sm:mt-12'>
              <strong className='text-2xl'>+ {info?.bets}</strong>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
      className='max-sm:hidden'
        quality={100}
        src={previewMobileImg}
        alt='Dois celulares exibindo uma prévia da aplicação móvel'
      />
    </div>
  )
}

export const getServerSideProps = SSRAuth(async context => {

  return {
    props: {

    },
  }
})
