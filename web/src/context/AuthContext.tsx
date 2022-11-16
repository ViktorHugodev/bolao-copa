import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import { useGoogleApi } from 'react-gapi'
import axios from 'axios'
import Google from 'next-auth/providers/google'
import {
  CredentialResponse,
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from '@react-oauth/google'
import { api } from '../lib/api'
interface IAuthContext {
  user: IUser[]
  SignInWithGoogle: () => Promise<void>
}
interface IAuthProvider {
  children: ReactNode
}

interface IUser {
  name: string
  email: string
  avatarUrl: string
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthContextProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser[]>([])
  const [token, setToken] = useState()
  const login =  useGoogleLogin({
    onSuccess: codeResponse => {
      return codeResponse
    },
    flow: 'implicit',
    scope: 'profile',
    
  })
  async function loginWithGoogle(){
    try {
      const res = await login()
      console.log('RES =>', res)
    } catch (error) {
      
    }
    

    console.log('TOKEN =>', token)
  } 
  console.log('token =>', token)
  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  return useContext(AuthContext)
}
