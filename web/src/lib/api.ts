
import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import Router from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '../authRoutes/AuthTokenError'
import { signOutAuth } from '../context/AuthContext'



export function setupAPIClient(context: GetServerSidePropsContext | undefined = undefined)  {
  let cookies = parseCookies(context)
  const api = axios.create({
    // baseURL: 'http://localhost:3333',
    baseURL: 'https://api-world-cup-guesses.herokuapp.com/',
    headers: {
      Authorization: `Bearer ${cookies['bolaoToken']}`,
    },
  })
  
  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log('CAIU AQUI')
        destroyCookie(context, 'bolaoToken')
        if(process.browser){
  
          signOutAuth()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      } else {
       
      }
      return Promise.reject(error)
    }
  )
  return api
}