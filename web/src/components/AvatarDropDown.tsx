import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IUser, signOutAuth, useAuth } from '../context/AuthContext'
import Image from 'next/image'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
interface IAvatarDropDown {
  user: IUser
}

export function AvatarDropDown({ user }: IAvatarDropDown) {
  console.log('user', user)
  return (
    <Menu as='div' className='relative inline-block text-left rounded-full'>
      <div>
        <Menu.Button
          className='inline-flex 
        gap-4
       
        items-center
        justify-center rounded-full bg-transparent text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-black'
        >
          <Image 
          width={32}
          height={32}
          className='mr-2 rounded-full' 
          src={user?.avatarUrl} alt='' />
          <ChevronDownIcon className='-mr-6' aria-hidden='true' />
          <strong className='whitespace-nowrap text-gray-100'>
            {user?.name}
          </strong>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
           
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-800 text-gray-100' : 'text-gray-200',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Meus bolões
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-800 text-gray-100' : 'text-gray-200',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Encontrar bolão
                </a>
              )}
            </Menu.Item>
            <form method='POST' action='#'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={signOutAuth}
                    className={classNames(
                      active ? 'bg-gray-800 text-gray-100' : 'text-gray-200',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sair
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
