import { createNewChatFormApi } from '@/features/create-new-chat-form/api/api'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { FormEvent } from 'react'

type Props = {
  onCreateNewChat: (chatId: string) => void
  idInstance: string
  apiTokenInstance: string
}

export const CreateNewChatForm = ({
  onCreateNewChat,
  idInstance,
  apiTokenInstance,
}: Props) => {
  const [checkPhoneNumber, { isLoading }] =
    createNewChatFormApi.useCheckPhoneNumberMutation()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const phoneNumber = formData.get('phoneNumber') as string

    checkPhoneNumber({
      phoneNumber,
      idInstance,
      apiTokenInstance,
    })
      .unwrap()
      .then((data) => {
        if (data.existsWhatsapp) {
          onCreateNewChat(phoneNumber)
        } else {
          alert('Phone number is not registered in WhatsApp')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form
      className="w-[400px] h-full gap-2 border-r-2 p-2"
      onSubmit={handleSubmit}
    >
      <div className=" flex items-end gap-2">
        <Input label="Phone number" name="phoneNumber" required />
        <Button disabled={isLoading} type="submit">
          {isLoading ? 'Creating chat...' : 'Create chat'}
        </Button>
      </div>
    </form>
  )
}
