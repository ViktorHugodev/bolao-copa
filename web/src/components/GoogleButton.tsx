import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'
interface IGoogleButton {
  size?: string
}

export function GoogleButton({size ='10'}:IGoogleButton) {
  const {signInGoogle, user} = useAuth()
  
  return (
    <button
      onClick={signInGoogle}
      className={`group  bg-white h-${size} px-6 border-2 border-gray-300 rounded-full transition duration-300 
      hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100`}
    >
      <div className='relative flex items-center space-x-4 justify-center'>
        <img
          src='https://tailus.io/sources/blocks/social/preview/images/google.svg'
          className='left-0 w-5'
          alt='google logo'
        />
        <span className='block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base'>
          Login com Google
        </span>
      </div>
    </button>
  )
}
