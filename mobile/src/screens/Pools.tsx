import { useCallback, useState } from 'react'
import { VStack, Icon, useToast, FlatList } from 'native-base'
import { Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {useFocusEffect} from '@react-navigation/native'
import { Loading } from '../components/Loading'
import { api } from '../service/api'
import { PoolCard, PoolPros } from '../components/PoolCard'
import { Button } from '../components/Button'
import { EmptyPoolList } from '../components/EmptyPoolList'
import { Header } from '../components/Header'
export function Pools() {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [pools, setPools] = useState<PoolPros[]>([])
  const toast = useToast()
  async function fetchPools() {
    try {
      setIsLoading(true)
      const response = await api.get('/pools')
      setPools(response.data.pools)
    } catch (error) {
      console.log('🚀 ~ file: Pools.tsx ~ line 16 ~ fetchPools ~ error', error)
      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)

    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools()
  }, []))

  return (
    <VStack bgColor='gray.900' flex={1}>
      <Header title='Meus Bolões' />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor='gray.600'
        pb={4}
        mb={4}>
        <Button
          leftIcon={<Icon as={Octicons} name='search' color='black' size='md' />}
          title='BUSCAR BOLÃO POR CÓDIGO'
          onPress={() => navigate('find')}
        />
        {isLoading ?
          <Loading />
          :
          <FlatList
            data={pools}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => <EmptyPoolList/>}
            renderItem={({ item }) => <PoolCard data={item} />}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              py: 5
            }}
          />

        }

      </VStack>
    </VStack>
  )
}