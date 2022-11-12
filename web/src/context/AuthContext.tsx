import { createContext, ReactNode, useContext, useState } from 'react';
import { getSession, signIn, signOut, useSession} from 'next-auth/react'

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
    await signIn('google')
    const session = await getSession()
    console.log('🚀 ~ file: AuthContext.tsx ~ line 26 ~ signInWithGoogle ~ session', session)


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