import { GoogleOAuthProvider } from '@react-oauth/google'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import '../styles/global.css'
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.log('session =>', session)

  return (
    <GoogleOAuthProvider clientId='944918821050-tgsv30av63525q9k3u46m2vf031c13q5.apps.googleusercontent.com'>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  )
}
