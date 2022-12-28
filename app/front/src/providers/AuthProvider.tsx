import { onAuthStateChanged } from 'firebase/auth'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { User } from '../@types/auth'
import Auth from '../config/Firebase'

interface AuthContext {
  user?: User
}

const AuthContext = createContext<AuthContext>({})

export function useAuthContext() {
  return useContext(AuthContext)
}

export function getCurrentUserId(): string {
  return useAuthContext().user?.uid ?? ''
}

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>(),
    [isAuthChecked, toggleIsAuthChecked] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUser(user)
      }
      toggleIsAuthChecked(true)
    })
    return () => {
      unsubscribed()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {isAuthChecked && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
