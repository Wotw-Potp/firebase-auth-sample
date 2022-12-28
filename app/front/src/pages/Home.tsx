import { NavLink } from 'react-router-dom'
import AlertBar from '../components/partials/AlertBar'
import Card from '../components/partials/Card'
import Container from '../components/partials/Container'
import { useAuthContext } from '../providers/AuthProvider'

const Home = () => {
  const { user } = useAuthContext()

  return (
    <>
      <Container>
        {!user?.displayName && (
          <div className='mb-6'>
            <AlertBar>
              <>
                Let me know what should I call you ??
                <NavLink
                  to='/settings'
                  className='ml-3 text-white font-bold underline hover:no-underline'
                >
                  Setting here.
                </NavLink>
              </>
            </AlertBar>
          </div>
        )}
        <Card isSection={true}>
          <div className='prose max-w-full'>
            <h1>Welcome !!</h1>
            {user && (
              <>
                <h2 className='flex items-center'>
                  <span className='grow'>Your Information</span>
                  <NavLink
                    to='/settings'
                    className='w-8 h-8 rounded-full shrink-0 hover:bg-slate-100 flex items-center justify-center'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z'
                      />
                    </svg>
                  </NavLink>
                </h2>
                <table>
                  <thead>
                    <tr>
                      <th>Avator</th>
                      <th>Display Name</th>
                      <th>Email</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='not-prose'>
                        <span className='inline-flex align-middle'>
                          {user.photoURL ? (
                            <img src={user.photoURL} />
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-6 h-6'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                              />
                            </svg>
                          )}
                        </span>
                      </td>
                      <td>{user.displayName ?? '-'}</td>
                      <td>{user.email ?? '-'}</td>
                      <td>{user.metadata?.creationTime}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </Card>
      </Container>
    </>
  )
}

export default Home
