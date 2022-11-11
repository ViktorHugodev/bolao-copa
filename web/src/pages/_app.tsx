import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/global.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log('session =>', session)
  return (
      <AuthContextProvider>
    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
      </AuthContextProvider>
  )
}
