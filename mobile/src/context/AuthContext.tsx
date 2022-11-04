import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
WebBrowser.maybeCompleteAuthSession()
export interface UserProps {
  name: string
  avatarUrl: string

}

export interface AuthContextDataProps {
  user: UserProps
  signIn: () => Promise<void>
  isUserLoading: boolean
}
interface AuthContextProps {
  children: ReactNode
}
export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProps) {
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '944918821050-n26o23p7isqqtkl9sooilhidh13o3hk4.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })
  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync()

    } catch (error) {
      console.log('ERROR => ', error)
      throw error

    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(access_token: string){
    console.log('TOKEN ACC =>', access_token)
  }
  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken){}
  }, [response])
  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextDataProps {
  return useContext(AuthContext)
}