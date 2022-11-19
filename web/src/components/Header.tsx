import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { AvatarDropDown } from './AvatarDropDown';
import { GoogleButton } from './GoogleButton';

export function Header(){
  const {user} = useAuth()
  return (
    <div className='bg-gray-600 w-full h-16 flex justify-between p-4 items-center'>
      <div>
        <h2 className='text-gray-100'>Bolão da Copa</h2>
      </div>
      <nav>
        <Link href="/mypools">Meus bolões</Link>
      </nav>
      <div>
        {user ? 
        <AvatarDropDown user={user}/>
     
        :
        <GoogleButton />
        }
      </div>
    </div>
  )
}