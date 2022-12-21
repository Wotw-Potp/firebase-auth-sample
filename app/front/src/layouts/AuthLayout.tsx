import { Outlet } from 'react-router'
import Card from '../components/partials/Card'
import Logo from '../assets/react.svg'

const AuthLayout = () => {
  return (
    <main className='w-screen h-screen flex justify-center items-center overflow-hidden bg-gray-100'>
      <Card isSection={true}>
        <div className='flex justify-center mb-6'>
          <img src={Logo} alt='' width='80' />
        </div>
        <Outlet />
      </Card>
    </main>
  )
}

export default AuthLayout
