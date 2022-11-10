import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, useToast, VStack, HStack } from 'native-base'
import { Share } from 'react-native'

import { api } from '../service/api'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { PoolPros } from '../components/PoolCard'
import { PoolHeader } from '../components/PoolHeader'
import { EmptyMyPoolList } from '../components/EmptyMyPoolList'
import { Option } from '../components/Option'
import { Guesses } from '../components/Guesses'
interface RouteParams {
  id: string
}

export function Details() {
  const [details, setDetails] = useState<PoolPros>({} as PoolPros)
  const [isLoading, setIsLoading] = useState(true)
  const [optionSelected, setOptionSelected] = useState<
    'Seus palpites' | 'Ranking do grupo'
  >('Seus palpites')
  const { params } = useRoute()
  const { id } = params as RouteParams
  const toast = useToast()

  async function handleCodeShare() {
    await Share.share({
      message: details.code,
    })
  }

  async function getDataPoolDetails() {
    try {
      setIsLoading(true)
      const detailsResponse = await api.get(`/pool/${id}`)
      console.log(
        '🚀 ~ file: Details.tsx ~ line 16 ~ getDataPoolDetails ~ detailsResponse',
        detailsResponse.data.pool
      )
      setDetails(detailsResponse.data.pool)
    } catch (error) {
      console.log('🚀 ~ line 25  ~ error', error)
      toast.show({
        title: 'Não foi possível carregar os dados do bolão!',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDataPoolDetails()
  }, [id])

  if (isLoading) return <Loading />

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header
        title={details.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {details._count?.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PoolHeader data={details} />
          <HStack bgColor='gray.800' p={1} rounded='sm' mb={5}>
            <Option
              onPress={() => setOptionSelected('Seus palpites')}
              title='Seus palpites'
              isSelected={optionSelected === 'Seus palpites'}
            />
            <Option
              onPress={() => setOptionSelected('Ranking do grupo')}
              title='Ranking do grupo'
              isSelected={optionSelected === 'Ranking do grupo'}
            />
          </HStack>
          <Guesses poolId={details.id} code={details.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={details.code} onShare={handleCodeShare} />
      )}
      <Text>Código do bolão: {''}</Text>
    </VStack>
  )
}
