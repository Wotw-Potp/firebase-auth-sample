import { Navigate, Outlet } from 'react-router'
import { useAuthContext } from './AuthProvider'

const PrivateRoute = () => {
  const { user } = useAuthContext()

  return user ? <Outlet /> : <Navigate to='login' />
}

export default PrivateRoute
