import Image from 'next/image'
import { FormEvent, useState } from 'react'
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

export default function Dash(props: HomeProps) {
  const [title, setTitle] = useState('')


  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pool', {
        title: title,
      })
      console.log('🚀 ~ file: dash.tsx:30 ~ handleSubmit ~ response', response.data)
      const { code } = response.data
      await navigator.clipboard.writeText(code)
      // alert(
      //   'Bolão criado com sucesso, o código foi copiado para a área de transferência'
      // )
    } catch (error) {
      console.log(error)
      // alert('Erro, tente novamente mais tarde.')
    }
  }

  return (
    <div className='max-w-6xl max-sm:mt-10 mt-10 grid grid-cols-2 max-sm:flex h-screen max-sm:items-start  mx-auto gap-28 max-sm:gap-4 px-6'>
      <main>
        <FormInput />
        <div className='flex items-center max-sm:mt-2 mt-10 gap-2 text-center justify-center'>
          {/* <Image src={usersAvatarImg} alt='Avatar de usuários' /> */}
          <strong className='text-gray-100 text-lg'>
            <span className='text-ignite-500'>+ {props.usersCount}</span>{' '}
            pessoas já estão usando
          </strong>
        </div>
       
        <div className='mt-10 pt-10 max-sm:border-t max-sm:flex-col border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex gap-4 items-center'>
            <Image src={checkBoxImg} alt='' />
            <div className='flex flex-col'>
              <strong className='text-2xl'>+ {props.poolsCount}</strong>
              <span className='font-normal'>Bolões criados</span>
            </div>
          </div>
          <div className='w-px h-14  bg-gray-600 max-sm:h-0 max-sm-w-0  ' />
          <div className='flex gap-4 max-sm:mt-10 max-sm:w-full max-sm:border-t max-sm:justify-center border-gray-600 items-center'>
            <Image src={checkBoxImg} alt='' className='max-sm:mt-12'/>
            <div className='flex flex-col max-sm:mt-12'>
              <strong className='text-2xl'>+ {props.betsCount}</strong>
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
  const apiClient = setupAPIClient(context)
  const [poolRequest, betsRequest, usersRequest] = await Promise.all([
    apiClient.get('/pools/count'),
    apiClient.get('/bets/count'),
    apiClient.get('/users/count'),
  ])


  return {
    props: {
      poolsCount: poolRequest.data.count,
      betsCount: betsRequest.data.count,
      usersCount: usersRequest.data.count,
      // user: user?.data.user,
    },
  }
})
