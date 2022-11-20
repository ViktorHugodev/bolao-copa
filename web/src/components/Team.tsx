import { InputCustom } from './InputCustom'
import ReactCountryFlag from 'react-country-flag'
interface ITeam {
  code: string
  position: 'left' | 'right'
  onChangeText: (value: string) => void
}

export function Team({ code, position }: ITeam) {
  return (
    <div className='flex gap-2 items-center '>
      {position === 'left' && (
        <ReactCountryFlag
          countryCode={code}
          svg
          style={{
            width: '4em',
            height: '4em',
          }}
          title='US'
        />
      )}

      <InputCustom />
      {position === 'right' && (
        <ReactCountryFlag
          countryCode={code}
          svg
          style={{
            width: '4em',
            height: '4em',
          }}
          title='US'
        />
      )}
    </div>
  )
}
