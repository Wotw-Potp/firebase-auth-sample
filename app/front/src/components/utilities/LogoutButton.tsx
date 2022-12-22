import { signOut } from '@firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Auth from '../../config/Firebase'

const LogoutButton = () => {
  const [isLoading, toggleIsLoading] = useState<boolean>(false),
    navigate = useNavigate()

  async function LogoutHandler() {
    toggleIsLoading(true)

    await signOut(Auth)
      .then(() => {
        navigate('/login', { replace: true })
      })
      .catch((err) => {
        console.error(err.message)
        toggleIsLoading(false)
      })
  }

  return (
    <button
      type='button'
      className='c-btn c-btn__sm'
      onClick={LogoutHandler}
      disabled={isLoading}
    >
      Logout
    </button>
  )
}

export default LogoutButton
