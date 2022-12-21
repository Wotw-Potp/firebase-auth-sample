import LoadingIcon from '../icons/Loading'

const LoadingLayer = () => {
  return (
    <div className='fixed inset-0 z-50 bg-white bg-opacity-30 flex items-center justify-center cursor-progress'>
      <div className='w-6 h-6'>
        <LoadingIcon />
      </div>
    </div>
  )
}

export default LoadingLayer
