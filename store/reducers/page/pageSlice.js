import { createSlice } from '@reduxjs/toolkit'
import allThunks, { fetchPage } from './asyncThunks'

const pageSlice = createSlice({
  name: 'pages',
  initialState: {
    load: false,
    error: '',
    pages: [],
  },
  reducers: {
  },
  extraReducers: {
    [fetchPage.pending]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchPage.fulfilled]: (state, action) => {
      state.load = false
      state.pages.push(action.payload)
    },
    [fetchPage.rejected]: (state, action) => {
      state.load = false
      state.error = action.error.message
    },
  }
})

export const pageActions = { ...pageSlice.actions, ...allThunks }
export const selectPage = (state) => state.page
export default pageSlice.reducer
