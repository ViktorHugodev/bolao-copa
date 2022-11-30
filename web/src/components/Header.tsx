import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { AvatarDropDown } from './AvatarDropDown'
import { GoogleButton } from './GoogleButton'
import logoImg from '../assets/copa-logo.png'
import Image from 'next/image'
export function Header() {
  const { user } = useAuth()
  return (
    <div className='bg-gray-600 w-full h-16 max-sm:px-2 px-8 flex justify-between items-center'>
      <div className='flex gap-4'>
        {/* <h2 className='text-gray-100'>Bolão da Copa</h2> */}
        <Link href={'/'}>
        <Image src={logoImg} alt='' className='w-16 h-18 max-sm:w-12 max-sm:h-12' />
        </Link>
       
        {!!user &&  <nav className='flex max-sm:gap-2 gap-4 items-center'>
        <Link
            href='/newpool'
            className='max-sm:text-[12px] text-yellow-500 hover:text-yellow-600'
          >
            Criar novo bolão
          </Link>
          <Link
            href='/mypools'
            className='text-yellow-500 max-sm:text-[12px] hover:text-yellow-600'
          >
            Meus bolões
          </Link>
          <Link
            href='/mypools'
            className='text-yellow-500 max-sm:text-[12px] hover:text-yellow-600'
          >
            Encontrar bolão
          </Link>
        </nav>}
       
      </div>

      <div>{user ? <AvatarDropDown user={user} /> : <GoogleButton size='10'/>}</div>
    </div>
  )
}
