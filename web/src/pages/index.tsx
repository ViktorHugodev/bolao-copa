import Image from 'next/image'
import previewMobileImg from '../assets/app-nlw-copa-preview.png'

import checkBoxImg from '../assets/icon-check.svg'
import { api } from '../lib/apiClient'
import { FormEvent, useState } from 'react'

import { SSRGuest } from '../authRoutes/SSRGuest'
import { GoogleButton } from '../components/GoogleButton'

interface HomeProps {
  poolsCount: number
  betsCount: number
  usersCount: number
}

export default function Home(props: HomeProps) {
  const [title, setTitle] = useState('')
  console.log('title', props)
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pool', {
        title: title,
      })
      const { code } = response.data
      await navigator.clipboard.writeText(code)
      alert(
        'Bolão criado com sucesso, o código foi copiado para a área de transferência'
      )
    } catch (error) {
      console.log(error)
      alert('Erro, tente novamente mais tarde.')
    }
  }

  return (
    <div className='max-w-6xl max-sm:mt-10 grid grid-cols-2 max-sm:flex h-screen max-sm:items-start items-center mx-auto gap-28 max-sm:gap-4 px-6'>
      <main>
        <h1 className='max-sm:mt-2 max-sm:text-3xl text-white font-bold text-5xl leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='flex items-center max-sm:mt-2 mt-10 gap-2'>
          {/* <Image src={usersAvatarImg} alt='Avatar de usuários' /> */}
          <strong className='text-gray-100 text-lg'>
            <span className='text-ignite-500'>+ {props.usersCount}</span>{' '}
            pessoas já estão usando
          </strong>
        </div>
        <div className='flex flex-col max-sm:mt-10 mt-10'>
          <GoogleButton size='20' />
          <p className='text-gray-300 text-sm mt-10 max-sm:mt-10 leading-relaxed'>
            Faça login para continuar 🚀
          </p>
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
            <Image src={checkBoxImg} alt='' className='max-sm:mt-12' />
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

export const getServerSideProps = SSRGuest(async context => {
  const [poolRequest, betsRequest, usersRequest] = await Promise.all([
    api('/pools/count'),
    api('/bets/count'),
    api('/users/count'),
  ])

  return {
    props: {
      poolsCount: poolRequest.data.count,
      betsCount: betsRequest.data.count,
      usersCount: usersRequest.data.count,
    },
  }
})
