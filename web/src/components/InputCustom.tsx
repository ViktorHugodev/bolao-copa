interface IInputCustom {
  placeholder?: string
}
interface IInputCustom {
  onChangeText: (value: string) => void
  value: string
}

export function InputCustom({ placeholder, value, onChangeText }: IInputCustom) {
  return (
    <input
      className='border
    bg-gray-800
     border-gray-600
    h-12
    px-4
    w-8
    placeholder:bg-gray-300
     focus:bg-gray-800
     focus:border-gray-500
    
     ' value={value}
      onChange={event => onChangeText(event.target.value)}
      type='text'
      placeholder={placeholder}
    />
  )
}
