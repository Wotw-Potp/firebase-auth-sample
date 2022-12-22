import { PropsWithChildren } from 'react'

const Dialog = ({ children }: PropsWithChildren) => {
  return (
    <div
      className='fixed inset-0 z-10 overflow-y-auto bg-slate-700 bg-opacity-30'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div className='relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dialog
