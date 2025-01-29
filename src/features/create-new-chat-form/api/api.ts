import { baseApi } from '@/shared/api';

export const createNewChatFormApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkPhoneNumber: builder.mutation<
      { existsWhatsapp: boolean },
      { phoneNumber: string; idInstance: string; apiTokenInstance: string }
    >({
      query: ({ phoneNumber, idInstance, apiTokenInstance }) => ({
        url: `/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
        method: 'POST',
        body: {
          phoneNumber,
        },
      }),
    }),
  }),
})
