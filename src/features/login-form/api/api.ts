import { StateInstanceModel } from './types';
import { baseApi } from '@/shared/api';

export const loginFormApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStateInstance: builder.query<
      StateInstanceModel,
      { idInstance: string; apiTokenInstance: string }
    >({
      query: ({ idInstance, apiTokenInstance }) =>
        `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
    }),
  }),
})
