import { Navigate } from 'react-router'
import { useAuthContext } from './AuthProvider'

const PublicRoute = () => {
  const { user } = useAuthContext()

  return user ? <Navigate to='home' /> : <Navigate to='login' />
}

export default PublicRoute
