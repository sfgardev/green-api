import { userSelectors } from '@/entities/user'
import { CreateNewChatForm } from '@/features/create-new-chat-form'
import { Messenger } from '@/features/messenger'
import { useAppSelector } from '@/shared/hooks'
import { useState } from 'react'
import { Navigate } from 'react-router'

export const Chat = () => {
  const [chatId, setChatId] = useState('')
  const idInstance = useAppSelector(userSelectors.selectIdInstance)
  const apiTokenInstance = useAppSelector(userSelectors.selectApiTokenInstance)

  if (!idInstance || !apiTokenInstance) {
    return <Navigate to="/" />
  }

  const handleCreateNewChat = (chatId: string) => {
    setChatId(chatId)
  }

  return (
    <div className="flex gap-4 h-dvh">
      <CreateNewChatForm
        onCreateNewChat={handleCreateNewChat}
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
      />
      <Messenger
        chatId={chatId}
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
      />
    </div>
  )
}
