import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

interface IAuthProps {
  token: {
    accessToken: string
  }
  account?: {
    access_token: string
  }
  session: any
  user?: any
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_KEY as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: IAuthProps) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ token, session}: IAuthProps) {
      session.accessToken = token.accessToken
      return session
    },
  },
  secret: process.env.SECRET,
}

export default NextAuth(authOptions)
