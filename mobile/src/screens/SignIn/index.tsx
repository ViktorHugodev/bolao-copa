import { Center, Icon, Text } from 'native-base';
import { Button } from '../../components/Button';
import { Fontisto } from '@expo/vector-icons'
import LogoImg from '../../assets/logo.svg'
import { useAuth } from '../../context/AuthContext';

export function SignIn() {
  const { user, signIn } = useAuth()
  console.log('DADOS =>', user)
  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <LogoImg width={212} height={40} />
      <Button
        // isLoading={true}
        type='SECONDARY'
        title='Entrar com o Google'
        mt={12}
        leftIcon={<Icon as={Fontisto}
          name='google'
          color='white'
          size='md'
        />}
        onPress={signIn}
      />
      <Text
        mt={4}
        color='white'
        textAlign='center'
      >
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}