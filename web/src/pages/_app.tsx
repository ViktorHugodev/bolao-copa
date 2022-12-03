import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import { createStandaloneToast } from '@chakra-ui/toast'

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  const { ToastContainer } = createStandaloneToast()
  return (
    <AuthContextProvider>
      <Header />
      <ToastContainer />
      <Component {...pageProps} />

    </AuthContextProvider>
  )
}
