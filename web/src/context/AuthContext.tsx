import { createContext, ReactNode, useContext, useState } from 'react';
import { signIn, signOut} from 'next-auth/react'

interface IAuthContext {
  user: IUser[]
  signInWithGoogle: () => Promise<void>
}
interface IAuthProvider {
  children: ReactNode
}

interface IUser {
  name: string
  email: string
  avatarUrl: string
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthContextProvider({children}:IAuthProvider){
  const [user, setUser] = useState<IUser[]>([])

  async function signInWithGoogle(){
    const response = await signIn('google')
    console.log('RESPONSE: ',response)
  }

  return (
    <AuthContext.Provider value={{
      signInWithGoogle,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth():IAuthContext{ 
  return useContext(AuthContext)
}