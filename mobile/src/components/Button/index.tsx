import { Button as ButtonNative, Text, IButtonProps } from 'native-base'
interface IButton extends IButtonProps {
  title: string
  type?: 'PRIMARY' | 'SECONDARY'
}
export function Button({ title, type = 'PRIMARY', ...rest }: IButton) {
  return (
    <ButtonNative
      w='full'
      h={14}
      rounded='sm'
      fontSize='md'
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.400' : 'yellow.600'
      }}
      _loading={{
        _spinner:{color: 'black'}
      }}
      {...rest}
    >
      <Text 
      fontSize='sm'
      textTransform='uppercase'
      color={type === 'SECONDARY' ? 'white' : 'black'}
      >
        {title}
      </Text>
    </ButtonNative>
  )
}