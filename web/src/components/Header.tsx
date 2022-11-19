import { useAuth } from '../context/AuthContext';
import { AvatarDropDown } from './AvatarDropDown';
import { GoogleButton } from './GoogleButton';

export function Header(){
  const {user} = useAuth()
  return (
    <div className='bg-white w-full h-16 flex justify-between p-4 items-center'>
      <div>
        <h2>Bolão da Copa</h2>
      </div>
      <div>
        {user ? 
        <AvatarDropDown/>
     
        :
        <GoogleButton />
        }
      </div>
    </div>
  )
}