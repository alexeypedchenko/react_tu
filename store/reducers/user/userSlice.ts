import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { IUser } from "../../../models/IUser";
export interface IUserState {
  user: IUser | null;
  isAuth: boolean;
}

const initialState: IUserState = {
  user: null,
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

export const userActions = {...userSlice.actions}
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer
