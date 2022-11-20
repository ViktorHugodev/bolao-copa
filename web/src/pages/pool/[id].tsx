import { useRouter } from 'next/router'

export default function Pool(){
  const router = useRouter()
  console.log('router', router)
  return (
    <h1>route</h1>
  )
}