/** react router */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from '../providers/PrivateRouteProvider'
import PublicRoute from '../providers/PublicRouteProvider'
/** layouts */
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
/** pages */
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Notfound from '../pages/Notfound'
import Home from '../pages/Home'
import Settings from '../pages/settings/Index'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicRoute />} />
        <Route path='/*'>
          <Route element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path='home' element={<Home />} />
              <Route path='settings' element={<Settings />} />
            </Route>
          </Route>
          <Route path='*' element={<Notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
