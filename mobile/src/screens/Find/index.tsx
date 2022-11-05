import { VStack,  Heading } from 'native-base';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
export function Find() {
  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Buscar por código' />
      <VStack mt={8} mx={5} alignItems='center'>

        <Heading
          color='white'
          fontSize='xl'
          my={8}
          textAlign='center'
          fontFamily='heading'
        >
       Encontre um bolão através de seu código único
        </Heading>

        <Input
          mt={2}
          placeholder='Qual o código do bolão?'
        />

        <Button
          title='Buscar bolão'
        />

       
      </VStack>
    </VStack>
  )
}