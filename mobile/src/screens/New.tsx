import { VStack, Text, Heading, useToast } from 'native-base';
import LogoImg from '../assets/logo.svg'
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useState } from 'react';
import { api } from '../service/api';

export function New() {
  const toast = useToast()
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleCreatePool() {

    if (!title.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão!',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    try {
      setIsLoading(true)
      await api.post('/pool', {
        title
      })
      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })
      setTitle('')
    } catch (error) {
      console.log('🚀 ~ file: New.tsx ~ line 25 ~ handleCreatePool ~ error', error)
      toast.show({
        title: 'Não foi possível criar o bolão!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Criar novo bolão' showBackButton={true}/>
      <VStack mt={8} mx={5} alignItems='center'>
        <LogoImg />
        <Heading
          color='white'
          fontSize='xl'
          my={8}
          textAlign='center'
          fontFamily='heading'
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          mt={2}
          placeholder='Qual o nome do seu bolão?'
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title='Criar meu bolão'
          onPress={handleCreatePool}
          isLoading={isLoading}
        />

        <Text
          color='gray.200'
          px={10}
          mt={4}
          fontSize='sm'
          textAlign='center'
        >
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}