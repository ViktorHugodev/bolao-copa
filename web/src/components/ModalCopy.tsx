import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { X } from 'phosphor-react'
import { toast } from 'react-toastify'
interface IModalCopy {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  code: string
}
export default function ModalCopy({ isOpen, setIsOpen, code }: IModalCopy) {
  const [text, setText] = useState(code)
  console.log('CODEmodal', code)
  const [copy, setCopy] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleCopyText() {
    setCopy(true)
    toast('Código copiado para a área de transferência', {
      position: 'top-center',
      autoClose: 3000,
      type: 'success',
      theme: 'dark',
    })
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-600 p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg text-gray-300 font-medium leading-6 items-center flex justify-between border-b 
                    border-b-gray-500 pb-2'
                  >
                    Código do seu bolão
                    <X size={32} onClick={closeModal} cursor='pointer' />
                  </Dialog.Title>

                  <div className='flex mt-4 gap-4 flex-col'>
                    <div className='flex items-center '>
                      <CopyToClipboard
                        text={code}
                        className='text-gray-200 cursor-pointer flex-1 text-center border rounded-md py-2 px-4 bg-gray-800 text-3xl font-bold'
                        onCopy={handleCopyText}
                      >
                        <strong className=''>
                          {text}
                        </strong>
                      </CopyToClipboard>
                    </div>
                    <span className='text-[12px] text-gray-500 text-center'>
                      {' '}
                      Clique acima para copiar o código
                    </span>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
