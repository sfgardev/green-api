import { ReceiveNotificationModel } from '@/features/messenger/api/types'
import { baseApi } from '@/shared/api'

export const messengerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      { idMessage: string },
      {
        chatId: string
        message: string
        idInstance: string
        apiTokenInstance: string
      }
    >({
      query: ({ chatId, message, idInstance, apiTokenInstance }) => ({
        url: `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        method: 'POST',
        body: {
          chatId,
          message,
        },
      }),
    }),
    receiveNotification: builder.query<
      ReceiveNotificationModel,
      { idInstance: string; apiTokenInstance: string }
    >({
      query: ({ idInstance, apiTokenInstance }) => ({
        url: `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      }),
    }),
    deleteNotification: builder.mutation<
      { result: boolean },
      { idInstance: string; apiTokenInstance: string; receiptId: number }
    >({
      query: ({ idInstance, apiTokenInstance, receiptId }) => ({
        url: `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        method: 'DELETE',
      }),
    }),
  }),
})
