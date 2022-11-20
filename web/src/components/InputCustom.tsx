interface IInputCustom {
  placeholder?: string
}

export function InputCustom({ placeholder }: IInputCustom) {
  return (
    <input
      className='border
    bg-gray-800
     border-gray-600
    h-14
    px-4
    w-8
    placeholder:bg-gray-300
     focus:bg-gray-800
     focus:border-gray-500

     '
      type='text'
      placeholder={placeholder}
    />
  )
}
