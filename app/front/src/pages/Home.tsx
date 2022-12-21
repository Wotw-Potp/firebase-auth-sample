import Card from '../components/partials/Card'
import Container from '../components/partials/Container'
import { useAuthContext } from '../providers/AuthProvider'

const Home = () => {
  const { user } = useAuthContext()

  return (
    <>
      <Container>
        <Card isSection={true}>
          <div className='prose max-w-full'>
            <h1>Welcome !!</h1>
            {user && (
              <>
                <h2>Your Infomation</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Display Name</th>
                      <th>Email</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
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
