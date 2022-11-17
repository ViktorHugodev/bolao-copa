import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithCustomToken,
  onAuthStateChanged,
  signOut,
 
  getAuth
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { api } from '../lib/api'



interface IAuthContext {
  user: IUser[]
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
  const [isLoading, setIsLoading] = useState(false)
  async function signInGoogle(){
    try {
      
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const accessResult = result.user
      const credential = GoogleAuthProvider.credentialFromResult(result)
      console.log('🚀 ~ file: AuthContext.tsx ~ line 49 ~ signInGoogle ~ credential', credential)

      const token = await api.post('/users', {
        access_token: credential?.accessToken
      })
      api.defaults.headers.common['Authorization'] = `Bearer ${token.data.token}`
      const userInfoResponse = await api.get('/me')
      console.log('🚀 ~ file: AuthContext.tsx ~ line 52 ~ signInGoogle ~ userInfoResponse', userInfoResponse.data)
      setUser(userInfoResponse.data.user)
    } catch (error) {
      console.log(' error', error)
      
    }
    
  }
  console.log('USER =>', user)
  return (
    <AuthContext.Provider
      value={{
        user,
        signInGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  return useContext(AuthContext)
}
