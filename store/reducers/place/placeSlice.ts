import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, store } from '../../store'
import { IPlace } from '../../../models/IPlace'
import allThunks, { fetchPlaces } from './asyncThunks'

// export interface IPlaceState {
//   currentPlace: IPlace | null;
//   places: IPlace[];
//   activePlace: IPlace | null;
//   hoveredPlace: IPlace | null;
// }

const initialState = {
  currentPlace: null,
  places: [],
  activePlace: null,
  hoveredPlace: null,
}

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setCurrentPlace: (state, action: PayloadAction<number>) => {
      if (state.currentPlace && state.currentPlace.id === action.payload) {
        state.currentPlace = null
      } else {
        state.currentPlace = state.places.find((el) => el.id === action.payload) || null
      }
    },
    setPlaces: (state, action) => {
      state.places = action.payload
    },
    setActivePlace: (state, action) => {
      state.activePlace = action.payload
    },
    setHoveredPlace: (state, action) => {
      state.hoveredPlace = action.payload
    },
  },
  extraReducers: {
    // [fetchPlaces.pending.type]: (state, action) => {
    //   state.request = true
    //   state.error = false
    // },
    [fetchPlaces.fulfilled.type]: (state, action) => {
      // state.request = false
      state.places = action.payload
    },
    // [fetchPlaces.rejected.type]: (state, action) => {
    //   state.request = false
    //   state.ingredients = []
    //   state.error = action.error.message
    // },
  }
})

export const placeActions = { ...placeSlice.actions, ...allThunks }
export const selectPlace = (state: RootState) => state.place
export default placeSlice.reducer
