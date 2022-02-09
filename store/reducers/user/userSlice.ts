import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { IUser } from "../../../models/IUser";
import allThunks, {
  fetchUserData,
  updateUserData,
} from './userActions'

export interface IUserState {
  load: boolean;
  error: string;
  user: IUser | null;
  isAuth: boolean;

  userData: object | null;
  userDataLoad: boolean;
  userDataError: string;
}

const initialState: IUserState = {
  load: false,
  error: '',
  user: null,
  isAuth: false,

  userData: null,
  userDataLoad: false,
  userDataError: '',
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
    clearUserData: (state) => {
      state.userData = null
    }
  },
  extraReducers: {
    // fetchUserData
    [fetchUserData.pending.type]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchUserData.fulfilled.type]: (state, action) => {
      state.load = false
      state.userData = action.payload
    },
    [fetchUserData.rejected.type]: (state, action) => {
      state.load = false
      state.userData = null
      state.error = action.error.message
    },

    // updateUserData
    [updateUserData.pending.type]: (state, action) => {
      state.userDataLoad = true
      state.userDataError = ''
    },
    [updateUserData.fulfilled.type]: (state, action) => {
      state.userDataLoad = false
      state.userData = action.payload
    },
    [updateUserData.rejected.type]: (state, action) => {
      state.userDataLoad = false
      state.userDataError = action.error.message
    },
  }

})

export const userActions = {...userSlice.actions, ...allThunks}
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer
