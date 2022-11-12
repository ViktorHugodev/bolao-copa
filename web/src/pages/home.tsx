import { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { api } from '../lib/api'

export default function Home(props) {
  console.log(props.session)
  return (
    <button
      onClick={() => signOut()}
      className='group h-12 px-6 border-2 bg-white border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100'
    >
      <div className='relative flex items-center space-x-4 justify-center px-4'>
        <img
          src='https://tailus.io/sources/blocks/social/preview/images/google.svg'
          className='absolute left-0 w-5'
          alt='google logo'
        />
        <span className='block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base'>
          Loggout
        </span>
      </div>
    </button>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  if (session) {
    const {accessToken} = session

    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  } else {
    return {
      redirect:{
        destination:'/login',
        permanent: false
      }
    }
  }
  return {
    props:{
      session
    }
  }

}
