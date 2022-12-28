import { NavLink } from 'react-router-dom'

interface Props {
  title: string
}

const PageHeadTitle = ({ title }: Props) => {
  return (
    <div className='inline-flex items-center gap-4'>
      <NavLink
        to='/home'
        className='rounded border border-slate-100 p-2 inline-block shadow-sm hover:bg-slate-100 hover:shadow-none transition-shadow'
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
            d='M15.75 19.5L8.25 12l7.5-7.5'
          />
        </svg>
      </NavLink>
      <h1 className='mb-0'>{title}</h1>
    </div>
  )
}

export default PageHeadTitle
