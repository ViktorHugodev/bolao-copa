import { AuthTokenError } from './AuthTokenError'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
export function SSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)
    if (!cookies['bolaoToken']) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    try {
      return await fn(context)
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(context, 'bolaoToken')
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }
    }
  }
}
