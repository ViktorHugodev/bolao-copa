import Image from 'next/image'
import previewMobileImg from '../assets/app-nlw-copa-preview.png'

import checkBoxImg from '../assets/icon-check.svg'

import { FormEvent, useState } from 'react'

import { SSRGuest } from '../authRoutes/SSRGuest'
import { GoogleButton } from '../components/GoogleButton'
import { api } from '../lib/apiClient'

interface HomeProps {
  poolsCount: number
  betsCount: number
  usersCount: number
}

export default function Home(props: HomeProps) {
  const [title, setTitle] = useState('')
  console.log('title', title)
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
    <>
      <div className='max-w-6xl grid grid-cols-2 h-screen items-center mx-auto gap-28'>
        <main>
          {/* <Image src={logoImg} alt='Logo NLW' /> */}

          <h1 className='mt-15 text-white font-bold text-5xl leading-tight'>
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className='flex items-center mt-10 gap-2'>
            {/* <Image src={usersAvatarImg} alt='Avatar de usuários' /> */}
            <strong className='text-gray-100 text-lg'>
              <span className='text-ignite-500'>+ {props.usersCount}</span>{' '}
              pessoas já estão usando
            </strong>
          </div>
          <div>
            <GoogleButton />
            <p className='text-gray-300 text-sm mt-4 leading-relaxed'>
              Faça login para continuar 🚀
            </p>
          </div>
          <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
            <div className='flex gap-4 items-center'>
              <Image src={checkBoxImg} alt='' />
              <div className='flex flex-col'>
                <strong className='text-2xl'>+ {props.poolsCount}</strong>
                <span className='font-normal'>Bolões criados</span>
              </div>
            </div>
            <div className='w-px h-14 bg-gray-600' />
            <div className='flex gap-4 items-center'>
              <Image src={checkBoxImg} alt='' />
              <div className='flex flex-col'>
                <strong className='text-2xl'>+ {props.betsCount}</strong>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>
        <Image
          quality={100}
          src={previewMobileImg}
          alt='Dois celulares exibindo uma prévia da aplicação móvel'
        />
      </div>
    </>
  )
}

export const getServerSideProps = SSRGuest(async context => {
  const [poolRequest, betsRequest, usersRequest] = await Promise.all([
    api('/pools/count'),
    api('/bets/count'),
    api('/users/count'),
  ])
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  return {
    props: {
      poolsCount: poolRequest.data.count,
      betsCount: betsRequest.data.count,
      usersCount: usersRequest.data.count,
    },
  }
})
