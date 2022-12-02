import { SSRAuth } from '../authRoutes/SSRAuth'
import { FormInput } from '../components/Input'

interface IPoolsPage {
  pools: any
}

export default function NewPool({  }: IPoolsPage) {

  return (
    <div className='mx-auto w-full max-w-[1080px] flex flex-col items-center mt-10'>
      <div className='flex'>
      <FormInput />
      </div>
    </div>
  )
}
export const getServerSideProps = SSRAuth(async context => {

  return {
    props: {

    },
  }
})
