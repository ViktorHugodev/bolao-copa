import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import { createStandaloneToast } from '@chakra-ui/toast'

const { ToastContainer, toast } = createStandaloneToast()
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <AuthContextProvider>
      <Header />
      <ToastContainer />
      <Component {...pageProps} />

    </AuthContextProvider>
  )
}
