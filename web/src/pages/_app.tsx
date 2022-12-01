import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <AuthContextProvider>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </AuthContextProvider>
  )
}
