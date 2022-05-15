import { createSlice } from '@reduxjs/toolkit'
import allThunks, {
  fetchUserData,
  updateUserData,
} from './userActions'

const initialState = {
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
    setAuth: (state, action) => {
      state.isAuth = action.payload
    },
    clearUserData: (state) => {
      state.userData = null
    }
  },
  extraReducers: {
    // fetchUserData
    [fetchUserData.pending]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.load = false
      state.userData = action.payload
    },
    [fetchUserData.rejected]: (state, action) => {
      state.load = false
      state.userData = null
      state.error = action.error.message
    },

    // updateUserData
    [updateUserData.pending]: (state, action) => {
      state.userDataLoad = true
      state.userDataError = ''
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.userDataLoad = false
      state.userData = action.payload
    },
    [updateUserData.rejected]: (state, action) => {
      state.userDataLoad = false
      state.userDataError = action.error.message
    },
  }

})

export const userActions = {...userSlice.actions, ...allThunks}
export const selectUser = (state) => state.user
export default userSlice.reducer
