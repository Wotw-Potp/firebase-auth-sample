import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@firebase/auth'
import { FirebaseError } from '@firebase/util'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { User } from '../../@types/auth'
import LoadingLayer from '../../components/partials/LoadingLayer'
import PagingTabs from '../../components/utilities/PagingTabs'
import { AuthPagingTabItems } from '../../config/Consts'
import Auth from '../../config/Firebase'
import { GoogleProvider } from '../../providers/GoogleProvider'

const Login = () => {
  const [email, setEmail] = useState<NonNullable<User['email']>>(''),
    [password, setPassword] = useState<string>(''),
    [isLoading, toggleIsLoading] = useState<boolean>(false),
    [errorMsg, setErrorMsg] = useState<string>(''),
    navigate = useNavigate()

  async function submitHandler() {
    toggleIsLoading(true)

    await signInWithEmailAndPassword(Auth, email, password)
      .then(() => {
        navigate('/home', { replace: true })
      })
      .catch((err: FirebaseError) => {
        setErrorMsg(err.message)
        toggleIsLoading(false)
      })
  }

  async function signInWithGoogle() {
    await signInWithPopup(Auth, GoogleProvider)
      .then(() => {
        navigate('/home', { replace: true })
      })
      .catch((err) => {
        const credential = GoogleAuthProvider.credentialFromError(err)
        console.error(credential)
      })
  }

  return (
    <>
      <PagingTabs items={AuthPagingTabItems} />
      <div className='prose mx-auto'>
        {errorMsg && (
          <p className='font-bold text-red-600 text-sm mb-4'>{errorMsg}</p>
        )}
        <dl className='mb-8'>
          <dt>
            <label htmlFor='email'>Email</label>
          </dt>
          <dd className='mb-4'>
            <input
              type='email'
              name='email'
              id='email'
              className='form-input rounded w-full'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </dd>
          <dt>
            <label htmlFor='password'>Password</label>
          </dt>
          <dd>
            <input
              type='password'
              name='password'
              id='password'
              className='form-input rounded w-full'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </dd>
        </dl>
        <div className='flex justify-center'>
          <button
            className='c-btn c-btn__sm'
            onClick={submitHandler}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
        <hr />
        <div className='flex items-end gap-4'>
          <span>Sign in with</span>
          <button
            type='button'
            onClick={signInWithGoogle}
            className='w-48 hover:opacity-75'
            disabled={isLoading}
          >
            <img
              src='/btn_google_signin_dark_normal_web@2x.png'
              alt=''
              className='my-0'
            />
          </button>
        </div>
        {isLoading && <LoadingLayer />}
      </div>
    </>
  )
}

export default Login
