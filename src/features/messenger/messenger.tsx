import { messengerApi } from '@/features/messenger/api/api'
import { ReceiveNotificationModel } from '@/features/messenger/api/types'
import { Button } from '@/shared/ui/button'
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

type Props = {
  chatId: string
  idInstance: string
  apiTokenInstance: string
}

type Notification = {
  idMessage: ReceiveNotificationModel['body']['idMessage']
  senderData: ReceiveNotificationModel['body']['senderData']
  messageData: ReceiveNotificationModel['body']['messageData']
  status: ReceiveNotificationModel['body']['status']
}

export const Messenger = ({ chatId, idInstance, apiTokenInstance }: Props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const isPollingRef = useRef(false)
  const notificationDictRef = useRef<{
    [idMessage: string]: Notification
  }>({})

  const [notifications, setNotifications] = useState<Notification[]>([])

  const [sendMessage, { isLoading: isSendMessageLoading }] =
    messengerApi.useSendMessageMutation()
  const [receiveNotification] = messengerApi.useLazyReceiveNotificationQuery()
  const [deleteNotification] = messengerApi.useDeleteNotificationMutation()

  const pollNotifications = useCallback(async () => {
    if (isPollingRef.current) return

    try {
      isPollingRef.current = true

      const notification = await receiveNotification({
        idInstance,
        apiTokenInstance,
      }).unwrap()

      if (notification === null) {
        return
      }

      const notificationByIdMessage =
        notificationDictRef.current[notification.body.idMessage]

      if (notificationByIdMessage) {
        notificationDictRef.current[notification.body.idMessage] = {
          idMessage:
            notification.body.idMessage || notificationByIdMessage.idMessage,
          senderData:
            notification.body.senderData || notificationByIdMessage.senderData,
          messageData:
            notification.body.messageData ||
            notificationByIdMessage.messageData,
          status: notification.body.status || notificationByIdMessage.status,
        }
      } else {
        notificationDictRef.current[notification.body.idMessage] = {
          idMessage: notification.body.idMessage,
          senderData: notification.body.senderData,
          messageData: notification.body.messageData,
          status: notification.body.status,
        }
      }

      setNotifications(Object.values(notificationDictRef.current))

      await deleteNotification({
        idInstance,
        apiTokenInstance,
        receiptId: notification.receiptId,
      })
    } catch (error) {
      console.error('Polling error:', error)
    } finally {
      isPollingRef.current = false
    }
  }, [receiveNotification, deleteNotification, idInstance, apiTokenInstance])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [notifications])

  useEffect(() => {
    if (!chatId) return

    const interval = setInterval(pollNotifications, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [chatId, pollNotifications])

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const message = (formData.get('message') as string).trim()

    if (!message) return

    await sendMessage({
      chatId: `${chatId}@c.us`,
      message,
      idInstance,
      apiTokenInstance,
    }).unwrap()

    form.reset()

    await pollNotifications()
  }

  const handleEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  if (!chatId) {
    return (
      <div className="p-2 flex-1">
        <h2 className="text-2xl font-bold text-center">
          Please, create new chat
        </h2>
      </div>
    )
  }

  return (
    <div className="p-2 flex flex-col flex-grow">
      <div className="flex flex-col gap-1 h-[calc(100dvh-42px)] overflow-y-auto pb-4">
        {notifications.map((message) => {
          const isMessageFromMe = !!message.messageData?.extendedTextMessageData

          if (!message.messageData) return null

          return isMessageFromMe ? (
            <div
              key={message.idMessage}
              className="self-end p-1 bg-blue-500 text-white rounded-lg"
            >
              <p>{message.messageData?.extendedTextMessageData?.text}</p>
            </div>
          ) : (
            <div
              key={message.idMessage}
              className="self-start p-1 bg-gray-500 text-white rounded-lg"
            >
              <p>{message.messageData?.textMessageData?.textMessage}</p>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <form
        ref={formRef}
        className="flex gap-2 mt-auto"
        onSubmit={handleSendMessage}
      >
        <textarea
          name="message"
          className="p-2.5 w-full text-sm text-gray-900 resize-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          rows={1}
          placeholder="Message..."
          onKeyDown={handleEnterPress}
        />
        <Button disabled={isSendMessageLoading}>Send</Button>
      </form>
    </div>
  )
}
