import { createUserWithEmailAndPassword } from '@firebase/auth'
import { FirebaseError } from '@firebase/util'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { User } from '../../@types/auth'
import LoadingLayer from '../../components/partials/LoadingLayer'
import PagingTabs from '../../components/utilities/PagingTabs'
import { AuthPagingTabItems } from '../../config/Consts'
import { Auth } from '../../config/Firebase'

const Register = () => {
  const [email, setEmail] = useState<NonNullable<User['email']>>(''),
    [password, setPassword] = useState<string>(''),
    [passwordConfirm, setPasswordConfirm] = useState<string>(''),
    [isLoading, toggleIsLoading] = useState<boolean>(false),
    [errorMsg, setErrorMsg] = useState<string>(''),
    navigate = useNavigate()

  async function submitHandler() {
    setErrorMsg('')
    toggleIsLoading(true)

    if (!comparePasswordValue()) {
      setErrorMsg('Input Passwords are incorrect')
      toggleIsLoading(false)
      return
    }

    await createUserWithEmailAndPassword(Auth, email, password)
      .then(() => {
        navigate('/home', { replace: true })
      })
      .catch((err: FirebaseError) => {
        setErrorMsg(err.message)
        toggleIsLoading(false)
      })
  }

  function comparePasswordValue() {
    return password === passwordConfirm && password !== ''
  }

  return (
    <>
      <PagingTabs items={AuthPagingTabItems}></PagingTabs>
      <div className='prose'>
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
          <dd className='mb-4'>
            <input
              type='password'
              name='password'
              id='password'
              className='form-input rounded w-full'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </dd>
          <dt>
            <label htmlFor='password-confirm'>Password again</label>
          </dt>
          <dd>
            <input
              type='password'
              name='password-confirm'
              id='password-confirm'
              className='form-input rounded w-full'
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </dd>
        </dl>
        <div className='flex justify-center'>
          <button
            className='c-btn c-btn__sm bg-green-600 hover:bg-green-500'
            onClick={submitHandler}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
        {isLoading && <LoadingLayer />}
      </div>
    </>
  )
}

export default Register
