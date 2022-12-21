import { NavLink } from 'react-router-dom'
import { TabItem } from '../../@types/component'

interface Props {
  items: TabItem[]
  columns?: number
}

const PagingTabs = ({ items, columns = 2 }: Props) => {
  const gridStyles = [
    'grid',
    'overflow-x-auto',
    'overflow-y-hidden',
    'border-b',
    'border-gray-200',
    'whitespace-nowrap',
    'mb-8',
  ]

  if (columns === items.length) {
    gridStyles.push('grid-cols-2')
  } else {
    switch (items.length) {
      case 3:
        gridStyles.push('grid-cols-3')
        break
      default:
        break
    }
  }

  return (
    <nav className={gridStyles.join(' ')}>
      {items &&
        items.map((item) => (
          <NavLink to={item.to} key={item.to} className='c-tabs__item'>
            <span>{item.label}</span>
          </NavLink>
        ))}
    </nav>
  )
}

export default PagingTabs
