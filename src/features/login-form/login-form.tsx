/* Пользователь переходит на сайт чата и вводит свои учетные данные из
системы GREEN-API (idInstance, apiTokenInstance) */

import { userActions } from '@/entities/user'
import { useAppDispatch } from '@/shared/hooks'
import { Input } from '@/shared/ui/input'
import { FormEvent } from 'react'

export const LoginForm = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const { idInstance, apiTokenInstance } = Object.fromEntries(formData) as {
      idInstance: string
      apiTokenInstance: string
    }

    dispatch(userActions.setCredentials({ idInstance, apiTokenInstance }))
  }

  return (
    <form
      className="w-full max-w-96 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Input label="id instance" name="idInstance" />
      <Input label="api token instance" name="apiTokenInstance" />
      <button className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
        Login
      </button>
    </form>
  )
}
