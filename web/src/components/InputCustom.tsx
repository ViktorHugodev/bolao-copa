import { Select, Option, SelectProps } from '@material-tailwind/react'
import { useState } from 'react'

interface IInputCustom {
  placeholder?: string
}
interface IInputCustom {
  onChangeText: (value: string) => void
  value: string
  position: 'left' | 'right'
}

const goals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export function InputCustom({
  placeholder,
  value,
  position,
  onChangeText,
}: IInputCustom) {
  console.log('value', value)

  return (
    <div>
      <Select
      
        id='goals'
        value={value}
        onChange={(e: any) => onChangeText(e)}
        className={`border rounded-sm overflow-hidden flex items-center justify-center bg-gray-500 border-gray-600 h-12 px-4 w-8 placeholder:bg-gray-300
        focus:bg-gray-600 focus:border-gray-500 text-lg [&>div]:absolute
        ${position === 'right' ? '[&>div]:ml-14': '[&>div]:-ml-14'}
        ${!value ? 'bg-gray-800': 'bg-gray-400'}
        `}
      >
        {goals.map(gol => (
          <Option key={gol} value={gol}>
            {gol}
          </Option>
        ))}
      </Select>
    </div>
  )
}
