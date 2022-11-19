import { GetServerSideProps } from 'next'

import {
  getCsrfToken,
  getSession,
  signIn,
  useSession,
  SignInResponse,
} from 'next-auth/react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/apiClient'


export default function Login() {
  const { signInGoogle } = useAuth()

  return (
    <div className='relative py-16 bg-gradient-to-br from-sky-50 to-gray-200 h-screen'>
      <div className='relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40'>
        <div className='m-auto md:w-8/12 lg:w-6/12 xl:w-6/12'>
          <div className='rounded-xl bg-white shadow-xl'>
            <div className='p-6 sm:p-16'>
              <div className='space-y-4'>
                <img
                  src='https://tailus.io/sources/blocks/social/preview/images/icon.svg'
                  loading='lazy'
                  className='w-10'
                  alt='tailus logo'
                />
                <h2 className='mb-8 text-2xl text-cyan-900 font-bold'>
                  Sign in to unlock the best of Tailus.
                </h2>
              </div>
              <div className='mt-16 grid space-y-4'>
             
              </div>

              <div className='mt-32 space-y-4 text-gray-600 text-center sm:-mb-8'>
                <p className='text-xs'>
                  By proceeding, you agree to our{' '}
                  <a href='#' className='underline'>
                    Terms of Use
                  </a>{' '}
                  and confirm you have read our{' '}
                  <a href='#' className='underline'>
                    Privacy and Cookie Statement
                  </a>
                  .
                </p>
                <p className='text-xs'>
                  This site is protected by reCAPTCHA and the{' '}
                  <a href='#' className='underline'>
                    Google Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href='#' className='underline'>
                    Terms of Service
                  </a>{' '}
                  apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getCsrfToken(context)
  console.log('🚀 ~ file: login.tsx ~ line 82 ~ session', session)
  const login = await api.post('/users', {
    access_token: session,
  })
  console.log('🚀 ~ file: login.tsx ~ line 86 ~ login', login.data)
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: '/home',
  //       permanent: false,
  //     },
  //   }
  // }
  // api.defaults.headers.common['Authorization'] = `Bearer ${login.data.token}`
  // const userInfoResponse = await api.get('/me')
  // console.log('🚀 ~ file: login.tsx ~ line 93 ~ constgetServerSideProps:GetServerSideProps= ~ userInfoResponse', userInfoResponse.data.me)

  return {
    props: {
      session,
    },
  }
}
