import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  isSection?: boolean
}

const Card = ({ children, isSection = false }: Props) => {
  const styles = ['shadow-md', 'bg-white']
  isSection
    ? styles.push('rounded-lg', 'p-8', 'min-w-[40vw]')
    : styles.push('rounded', 'p-4')

  return <div className={styles.join(' ')}>{children}</div>
}

export default Card
