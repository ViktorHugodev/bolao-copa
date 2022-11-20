import { GoogleOAuthProvider } from '@react-oauth/google'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log('session =>', session)

  return (
    <AuthContextProvider>
      <Header />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
