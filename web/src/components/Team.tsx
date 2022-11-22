import { InputCustom } from './InputCustom'
import ReactCountryFlag from 'react-country-flag'
interface ITeam {
  code: string
  position: 'left' | 'right'
  onChangeText: (value: string) => void
  setFirstTeamPoints?: (value: string) => void
  setSecondTeamPoints?: (value: string) => void
  value: string
}

export function Team({
  code,
  position,
  setFirstTeamPoints,
  setSecondTeamPoints,
  value,
}: ITeam) {
  return (
    <div className='flex gap-2 items-center '>
      {position === 'left' && (
        <>
          <InputCustom
            position={position}
            value={value}
            onChangeText={setFirstTeamPoints}
          />
          <ReactCountryFlag
            countryCode={code}
            svg
            style={{
              width: '4em',
              height: '4em',
            }}
            title='US'
          />
        </>
      )}

      {position === 'right' && (
        <>
          <ReactCountryFlag
            countryCode={code}
            svg
            style={{
              width: '4em',
              height: '4em',
            }}
            title='US'
          />
          <InputCustom
            position={position}
            value={value}
            onChangeText={setSecondTeamPoints}
          />
        </>
      )}
    </div>
  )
}
