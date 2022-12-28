import { useState } from 'react'
import { deleteUser, updateProfile } from '@firebase/auth'
import { User } from '../../@types/auth'
import Card from '../../components/partials/Card'
import Container from '../../components/partials/Container'
import { useAuthContext } from '../../providers/AuthProvider'
import AlertPopup from '../../components/partials/AlertPopup'
import { PopupProps } from '../../@types/component'
import { useNavigate } from 'react-router-dom'
import Dialog from '../../components/partials/Dialog'
import PageHeadTitle from '../../components/utilities/PageHeadTitle'
import MarkdownEditor, { MDEditorProps } from '@uiw/react-md-editor'
import RehypeSanitize from 'rehype-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { upsertUserProfile } from '../../providers/DatabaseProvider'

const Settings = () => {
  const { user } = useAuthContext(),
    [name, setName] = useState<NonNullable<User['displayName']>>(
      user?.displayName ?? ''
    ),
    [photoUrl, setPhotoUrl] = useState<NonNullable<User['photoURL']>>(
      user?.photoURL ?? ''
    ),
    [confirmUserEmail, setConfirmUserEmail] =
      useState<NonNullable<User['email']>>(''),
    [popupProps, setPopupProps] = useState<PopupProps>({
      text: '',
      type: 'success',
    }),
    [profile, setProfile] = useState<string | undefined>(''),
    previewOptions: MDEditorProps['previewOptions'] = {
      rehypePlugins: [[RehypeSanitize]],
    },
    [isLoading, toggleIsLoading] = useState<boolean>(false),
    [isShowDialog, toggleIsShowDialog] = useState<boolean>(false),
    [isConfirmedAccountDeletion, toggleIsConfirmedAccountDeletion] =
      useState<boolean>(false),
    navigate = useNavigate()

  async function AccountSubmitHandler() {
    if (!user) return
    toggleIsLoading(true)

    await updateProfile(user, {
      displayName: name,
      photoURL: photoUrl,
    })
      .then(() => {
        setName(user.displayName ?? '')
        setPhotoUrl(user.photoURL ?? '')
        setPopupProps({
          text: 'Settings updated',
          type: 'success',
        })
      })
      .catch((err) => {
        setPopupProps({
          text: err.message,
          type: 'danger',
        })
      })
      .finally(() => toggleIsLoading(false))
  }

  const userEmailConfirmationHandler = (value: string) => {
    if (isConfirmedAccountDeletion) toggleIsConfirmedAccountDeletion(false)

    if (value === user?.email) {
      toggleIsConfirmedAccountDeletion(true)
    }
    return value
  }

  async function userDeletionHandler() {
    if (!user) return

    toggleIsLoading(true)

    await deleteUser(user)
      .then(() => {
        setPopupProps({
          text: `GoodBye ${user.displayName ?? 'Master'}`,
          type: 'success',
        })
        setTimeout(() => {
          navigate('/login', { replace: true })
        }, 2500)
      })
      .catch((err) => {
        setPopupProps({
          text: err.message,
          type: 'danger',
        })
        toggleIsLoading(false)
      })
  }

  async function profileSubmitHandler() {
    if (!user || !profile) return
    toggleIsLoading(true)

    await upsertUserProfile(user.uid, profile)
      .then(() => {
        setPopupProps({
          text: 'Profile updated',
          type: 'success',
        })
      })
      .catch((err) => {
        setPopupProps({
          text: err.message,
          type: 'danger',
        })
      })
      .finally(() => toggleIsLoading(false))
  }

  return (
    <>
      <Container>
        <Card isSection={true}>
          <div className='prose max-w-full'>
            <PageHeadTitle title='Settings' />
            <section>
              <h2>Profile</h2>
              <div className='lg:px-24 space-y-6'>
                <div data-color-mode='light'>
                  <MarkdownEditor
                    value={profile}
                    onChange={setProfile}
                    highlightEnable={false}
                    preview='live'
                    previewOptions={previewOptions}
                  />
                </div>
                <div className='py-4'>
                  <button
                    type='button'
                    className='c-btn c-btn__sm'
                    onClick={profileSubmitHandler}
                    disabled={isLoading}
                  >
                    save
                  </button>
                </div>
              </div>
            </section>
            <section>
              <h2>Account</h2>
              <div className='lg:px-24 space-y-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='inline-block text-lg font-bold mb-2'
                  >
                    Display Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='form-input rounded w-full'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor='photo-url'
                    className='inline-block text-lg font-bold mb-2'
                  >
                    Avater URL
                  </label>
                  <input
                    type='url'
                    name='photo-url'
                    id='photo-url'
                    className='form-input rounded w-full'
                    value={photoUrl}
                    onChange={(event) => setPhotoUrl(event.target.value)}
                  />
                </div>
                <div className='py-4'>
                  <button
                    type='button'
                    className='c-btn c-btn__sm'
                    onClick={AccountSubmitHandler}
                    disabled={isLoading}
                  >
                    save
                  </button>
                </div>
                <hr />
                <h3>Danger Zone</h3>
                <div className='p-6 border border-red-500 rounded'>
                  <div className='flex justify-between items-center'>
                    <div className='text-lg font-bold'>Account Delete</div>
                    <button
                      type='button'
                      className='c-btn c-btn__sm --danger'
                      onClick={() => toggleIsShowDialog(true)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Card>
      </Container>
      {isShowDialog && (
        <Dialog>
          <div className='space-y-4'>
            <div className='flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-8 h-8 text-gray-700 dark:text-gray-300'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
                />
              </svg>
            </div>

            <div className='text-center'>
              <h3
                className='text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white'
                id='modal-title'
              >
                Account Delete Confirmation
              </h3>
              <p className='mt-4 text-sm text-gray-500 dark:text-gray-400'>
                Are you sure Deletion your Account ??
                <br />
                To continue, Enter your Account's Email here.
              </p>
              <div className='px-4 mt-3'>
                <input
                  type='email'
                  name='email'
                  id='your-email'
                  placeholder='me@example.com'
                  className='form-input rounded w-full'
                  value={confirmUserEmail}
                  onChange={(event) => {
                    setConfirmUserEmail(
                      userEmailConfirmationHandler(event.target.value)
                    )
                  }}
                />
              </div>
            </div>

            <hr />

            <nav className='sm:flex sm:items-center justify-end gap-4 pt-2'>
              <button
                type='button'
                className='c-btn c-btn__xs --cancel'
                onClick={() => {
                  setConfirmUserEmail('')
                  toggleIsShowDialog(false)
                }}
              >
                Cancel
              </button>

              <button
                type='button'
                className='c-btn c-btn__xs --danger'
                disabled={!isConfirmedAccountDeletion}
                onClick={userDeletionHandler}
              >
                Done
              </button>
            </nav>
          </div>
        </Dialog>
      )}
      <AlertPopup {...popupProps} />
    </>
  )
}

export default Settings
