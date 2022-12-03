import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { AuthContextProvider } from '../context/AuthContext'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/global.css'
import { createStandaloneToast } from '@chakra-ui/toast'

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const { ToastContainer } = createStandaloneToast()
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Header />
        <ToastContainer />
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}
