
import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { signOutAuth } from '../context/AuthContext'



export function setupAPIClient(context: GetServerSidePropsContext | undefined = undefined)  {
  let cookies = parseCookies(context)
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['bolaoToken']}`,
    },
  })
  
  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        console.log('CAIU AQUI')
        destroyCookie(context, 'bolaoToken')
        if(process.browser){
  
          // signOutAuth()
        }
      } else {
        destroyCookie(undefined, 'bolaoToken')
        if(process.browser){
  
          // signOutAuth()
        }
      }
      return Promise.reject(error)
    }
  )
  return api
}