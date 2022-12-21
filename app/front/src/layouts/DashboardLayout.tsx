import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/react.svg'
import LogoutButton from '../components/utilities/LogoutButton'

const DashboardLayout = () => {
  const [navigationHeight, setNavigationHeight] = useState<number>(0),
    navigationId = 'globalNavigation'

  useEffect(() => {
    const navigationElement = document.getElementById(navigationId)
    if (navigationElement) {
      setNavigationHeight(navigationElement.clientHeight)
    }
  }, [])

  return (
    <div className='bg-slate-100 min-h-screen relative'>
      <nav
        className='absolute top-0 left-0 right-0 z-10 shadow px-6 py-4 bg-white'
        id={navigationId}
      >
        <div className='flex justify-between items-center'>
          <div>
            <NavLink to='home'>
              <img src={Logo} alt='' />
            </NavLink>
          </div>
          <nav>
            <LogoutButton />
          </nav>
        </div>
      </nav>
      <main style={{ paddingTop: `${navigationHeight * 1.4}px` }}>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
