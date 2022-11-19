import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'
export function SSRAuth<P>(fn: GetServerSideProps<P>){
  return async (context:GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    
    const cookies = parseCookies(context)
    if (!cookies['bolaoToken']) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    return await fn(context)
  }
}
