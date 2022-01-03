import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const { setIsAuth } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
