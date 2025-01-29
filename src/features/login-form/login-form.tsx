/* Пользователь переходит на сайт чата и вводит свои учетные данные из
системы GREEN-API (idInstance, apiTokenInstance) */

import { Input } from '@/shared/ui/input'

export const LoginForm = () => {
  return (
    <form className="w-full max-w-96 flex flex-col gap-4">
      <Input label="id instance" />
      <Input label="api token instance" />
      <button
        type="button"
        className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
      >
        Login
      </button>
    </form>
  )
}
