import { userActions } from '@/entities/user'
import { loginFormApi } from '@/features/login-form/api/api'
import { useAppDispatch } from '@/shared/hooks'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router'

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [getStateInstance, { isLoading }] =
    loginFormApi.useLazyGetStateInstanceQuery()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const { idInstance, apiTokenInstance } = Object.fromEntries(formData) as {
      idInstance: string
      apiTokenInstance: string
    }

    getStateInstance({ idInstance, apiTokenInstance })
      .unwrap()
      .then((data) => {
        if (data.stateInstance === 'authorized') {
          dispatch(userActions.setCredentials({ idInstance, apiTokenInstance }))
          navigate('/home')
        } else {
          alert(`State instance status: ${data.stateInstance}`)
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <form
      className="w-full max-w-96 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Input label="id instance" name="idInstance" required />
      <Input label="api token instance" name="apiTokenInstance" required />
      <Button disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</Button>
    </form>
  )
}
