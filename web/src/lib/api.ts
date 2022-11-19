
import axios, { AxiosError } from 'axios'
import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { signOutAuth } from '../context/AuthContext'

let cookies = parseCookies()

export const api = axios.create({
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
    } else {
      signOutAuth()
    }
    return Promise.reject(error)
  }
)
