import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = { idInstance: string | null; apiTokenInstance: string | null }
const initialState: State = {
  idInstance: null,
  apiTokenInstance: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ idInstance: string; apiTokenInstance: string }>
    ) => {
      state.idInstance = action.payload.idInstance
      state.apiTokenInstance = action.payload.apiTokenInstance
    },
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
