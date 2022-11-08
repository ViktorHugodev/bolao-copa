import { VStack, Icon } from 'native-base';
import { Octicons } from '@expo/vector-icons'

import { Button } from '../components/Button';
import { Header } from '../components/Header'
export function Pools() {
  return (
    <VStack bgColor='gray.900' flex={1}>
      <Header title='Meus Bolões' />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor='gray.600'
        pb={4}
        mb={4}>w
        <Button
          leftIcon={<Icon as={Octicons} name='search' color='black' size='md' />}
          title='BUSCAR BOLÃO POR CÓDIGO' />
      </VStack>
    </VStack>
  )
}