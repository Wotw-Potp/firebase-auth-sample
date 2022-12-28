import { NavLink } from 'react-router-dom'
import AddIcon from '../../components/icons/Add'
import { getCurrentUserId } from '../../providers/AuthProvider'
import { getUserMemo, getUserMemosRef } from '../../providers/DatabaseProvider'

const MemoTop = () => {
  const uid = getCurrentUserId(),
    userMemosRef = getUserMemosRef(uid),
    { data } = getUserMemo(userMemosRef)

  function parseTimestamp(time: number) {
    const date = new Date(time)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <>
      <section>
        <div className='flex justify-between items-center gap-4 mb-8'>
          <h2 className='my-0'>All Memos</h2>
          <NavLink
            to='/memo/add'
            className='c-btn c-btn__sm flex items-center gap-2'
          >
            <span>new</span>
            <AddIcon />
          </NavLink>
        </div>
        {data && (
          <div className='grid grid-cols-3 gap-4' data-color-mode='light'>
            {Object.entries(data).map(([key, item]) => (
              <div className='c-note' key={key}>
                <div className='c-note__cnt'>
                  <span className='absolute top-2 right-2 text-xs text-slate-600'>
                    <time dateTime='Y/m/d'>
                      created: {parseTimestamp(item.createdAt)}
                    </time>
                  </span>
                  <h3>{item.title}</h3>
                  <p className='whitespace-pre-wrap'>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default MemoTop
