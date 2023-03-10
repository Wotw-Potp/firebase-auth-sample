import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import AppLogo from '../components/icons/AppLogo'
import LogoutButton from '../components/utilities/LogoutButton'

const DashboardLayout = () => {
  const [navigationHeight, setNavigationHeight] = useState<number>(0),
    navigationId = 'globalNavigation',
    topNavLinks = [
      { to: 'home', label: 'Home' },
      { to: 'memo', label: 'Memo' },
      { to: 'settings', label: 'Settings' },
    ]

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
          <div className='flex items-center gap-6'>
            <NavLink to='home'>
              <AppLogo width={45} />
            </NavLink>
            <ul className='flex gap-3'>
              {topNavLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? 'text-blue-500 font-bold' : undefined
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <nav>
            <LogoutButton />
          </nav>
        </div>
      </nav>
      <main style={{ paddingTop: `${navigationHeight * 1.4}px` }} className='pb-20'>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
