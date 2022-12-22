import { Outlet } from 'react-router'
import Card from '../components/partials/Card'
import AppLogo from '../components/icons/AppLogo'

const AuthLayout = () => {
  return (
    <main className='w-screen h-screen flex justify-center items-center overflow-hidden bg-gray-100'>
      <Card isSection={true}>
        <div className='flex justify-center mb-6'>
          <AppLogo />
        </div>
        <Outlet />
      </Card>
    </main>
  )
}

export default AuthLayout
