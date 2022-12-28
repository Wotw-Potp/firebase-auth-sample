import { NavLink, Outlet } from 'react-router-dom'
import Card from '../components/partials/Card'
import Container from '../components/partials/Container'
import PageHeadTitle from '../components/utilities/PageHeadTitle'

const MemoLayout = () => {
  return (
    <Container>
      <Card isSection={true}>
        <div className='prose max-w-none'>
          <div className='mb-10'>
            <PageHeadTitle title='Memo' />
          </div>
          <Outlet />
        </div>
      </Card>
    </Container>
  )
}

export default MemoLayout
