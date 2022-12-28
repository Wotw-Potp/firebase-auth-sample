import { useState } from 'react'
import AlertPopup from '../../components/partials/AlertPopup'
import { PopupProps } from '../../@types/component'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserId } from '../../providers/AuthProvider'
import { insertUserMemo } from '../../providers/DatabaseProvider'
import { Memo } from '../../@types/memo'

const MemoAdd = () => {
  const [isLoading, toggleIsLoading] = useState<boolean>(false),
    [popupProps, setPopupProps] = useState<PopupProps>({
      text: '',
      type: 'success',
    }),
    navigate = useNavigate(),
    userId = getCurrentUserId(),
    [memoTitle, setMemoTitle] = useState<Memo['title']>(''),
    [memoContent, setMemoContent] = useState<Memo['content']>('')

  async function handleSave() {
    toggleIsLoading(true)

    if (!validateSubmittion()) {
      toggleIsLoading(false)
      return
    }

    const postData: Memo = {
      title: memoTitle,
      content: memoContent,
      createdAt: Date.now(),
    }

    await insertUserMemo(userId, postData)
      .then(() => {
        navigate('/memo')
      })
      .catch((err) => {
        setPopupProps({
          text: err.message,
          type: 'danger',
        })
        toggleIsLoading(false)
      })
  }

  function validateSubmittion() {
    let errorMsg = ''
    if (!memoTitle) errorMsg += 'Title is required.'
    if (!memoContent) {
      if (errorMsg) {
        errorMsg += '\nContent is required.'
      } else {
        errorMsg += 'Content is required.'
      }
    }

    if (errorMsg) {
      setPopupProps({
        text: errorMsg,
        type: 'danger',
      })

      return false
    }
    return true
  }

  return (
    <>
      <section>
        <div className='mb-8'>
          <h2 className='mt-0'>Add New Memo</h2>
          <dl>
            <dt>
              <label htmlFor='title'>Title</label>
            </dt>
            <dd className='mb-4'>
              <input
                type='text'
                name='title'
                id='title'
                className='form-input rounded w-full'
                value={memoTitle}
                onChange={(event) => setMemoTitle(event.target.value)}
              />
            </dd>
            <dt>
              <label htmlFor='content'>Content</label>
            </dt>
            <dd>
              <textarea
                name='content'
                id='content'
                rows={10}
                className='form-textarea rounded w-full'
                value={memoContent}
                onChange={(event) => setMemoContent(event.target.value)}
              ></textarea>
            </dd>
          </dl>
          <div className='text-center pt-6'>
            <button
              type='button'
              className='c-btn c-btn__sm'
              onClick={handleSave}
              disabled={isLoading}
            >
              save
            </button>
          </div>
        </div>
      </section>
      <AlertPopup {...popupProps} />
    </>
  )
}

export default MemoAdd
