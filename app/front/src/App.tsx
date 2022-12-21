import Router from './config/Router'
import AuthProvider from './providers/AuthProvider'

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
