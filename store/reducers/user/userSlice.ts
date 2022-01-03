import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { IUserState } from './types'

const initialState: IUserState = {
  user: {},
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer