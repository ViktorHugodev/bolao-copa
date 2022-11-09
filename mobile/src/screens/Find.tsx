import { useState } from 'react';
import { VStack, Heading, useToast } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../service/api';
import { useNavigation } from '@react-navigation/native';

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')
  const toast = useToast()
  const {navigate} = useNavigation()

  async function handleJoinPool() {
    try {
      setIsLoading(true)
      if(!code.trim()){
        return toast.show({
          title: 'Informe um código!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
      await api.post('/pool/join', {
        code
      })

      toast.show({
        title: 'Você entrou nesse bolão',
        placement: 'top',
        bgColor: 'green.500'
      })
      setCode('')
      navigate('pools')
    } catch (error) {
      console.log('🚀 ~ file: Find.tsx ~ line 13 ~ handleJoinPool ~ error', error)
      setIsLoading(false)
      if (error.response?.data?.message === 'Pool not found') {
        return toast.show({
          title: 'Bolão não encontado!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if (error.response?.data?.message === 'You already joined this pool') {
        return toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      toast.show({
        title: 'Não foi possível encontrar bolão!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } 
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Buscar por código' showBackButton={true} />

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
        onChangeText={setCode}
        autoCapitalize='characters'
        value={code}
      />

      <Button
        isLoading={isLoading}
        title='Buscar bolão'
        onPress={handleJoinPool}
      />


    </VStack >
  )
}