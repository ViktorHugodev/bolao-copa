import { GoogleLogin } from '@react-oauth/google'

export function GoogleButton() {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        console.log('JWT =>',credentialResponse)
      }}
      onError={() => {
        console.log('Login Failed')
      }}
    />
  )
}
