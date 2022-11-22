import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithCustomToken,
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

import Router from 'next/router'
import { api } from '../lib/apiClient'

interface IAuthContext {
  user: IUser
  isAuthenticated: boolean
  signInGoogle: () => void
}
interface IAuthProvider {
  children: ReactNode
}

export interface IUser {
  name: string
  email: string
  avatarUrl: string
}

export const AuthContext = createContext({} as IAuthContext)
export function signOutAuth() {
  destroyCookie(undefined, 'bolaoToken')
  Router.push('/')
}

export function AuthContextProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser>()
  const [token, setToken] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const isAuthenticated = !!user

  useEffect(() => {
    const { bolaoToken: token } = parseCookies()
    if (token) {
      api
        .get('/me')
        .then(response => {
          setUser({
            ...response.data.user,
            shortName:
              response.data.user.name.split(' ')[0] + ' ' +
              response.data.user.name.split(' ')[1],
          })
        })
        .catch(error => {
          console.log(
            '🚀 ~ file: AuthContext.tsx ~ line 55 ~ api.get ~ error',
            error
          )
          // signOutAuth()
        })
    }
  }, [])
  async function signInGoogle() {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const accessResult = result.user
      const credential = GoogleAuthProvider.credentialFromResult(result)
      console.log(
        '🚀 ~ file: AuthContext.tsx ~ line 49 ~ signInGoogle ~ credential',
        credential
      )

      const tokenAcess = await api.post('/users', {
        access_token: credential?.accessToken,
      })
      const { token } = tokenAcess.data
      console.log(
        '🚀 ~ file: AuthContext.tsx ~ line 58 ~ signInGoogle ~ token',
        token
      )
      api.defaults.headers['Authorization'] = `Bearer ${token}`
      const userInfoResponse = await api.get('/me')
      setCookie(undefined, 'bolaoToken', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      // setCookie(undefined, 'refreshTokenBolao', token, {
      //   maxAge: 60 * 60 * 24 * 30,
      //   path:'/'
      // })
      console.log('LOG => ', userInfoResponse.data.user)
      setUser({
        ...userInfoResponse.data.user,
        shortName:
          userInfoResponse.data.user.name.split(' ')[0] + ' '+
          userInfoResponse.data.user.name.split(' ')[1],
      })
      Router.push('/dash')
    } catch (error) {
      console.log(' error', error)
    }
  }
  console.log('USER =>', user)
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signInGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  return useContext(AuthContext)
}
