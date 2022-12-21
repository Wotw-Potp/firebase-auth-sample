import { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
  return <div className='px-6 max-w-5xl mx-auto'>{children}</div>
}

export default Container
