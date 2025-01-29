export type ReceiveNotificationModel = {
  receiptId: number
  body: {
    chatId: string | undefined
    idMessage: string
    status: string | undefined
    senderData: {
      chatId: string
      sender: string
      senderName: string
      senderContactName: string
      chatName: string | undefined
    }
    messageData: {
      typeMessage: string
      textMessageData: {
        textMessage: string
      }
      extendedTextMessageData:
        | {
            text: string
          }
        | undefined
    }
  }
}
