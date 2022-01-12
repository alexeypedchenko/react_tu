import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import allThunks, { fetchPlaces } from './asyncThunks'
import { filterItems, getFilterList } from '../../../utils/filters'

const initialState = {
  place: {},
  places: [],
  filteredPlaces: [],
  activePlace: null,
  hoveredPlace: null,
  filterList: {},
  filter: {
    name: '',
    tags: '',
    region: '',
  }
}

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setPlaces: (state, action) => {
      state.places = action.payload
    },
    setActivePlace: (state, action) => {
      state.activePlace = action.payload
    },
    setHoveredPlace: (state, action) => {
      state.hoveredPlace = action.payload
    },
    setFilter: (state, action) => {
      const { name, value } = action.payload
      state.filter[name] = value
    },
    setFilterList: (state, action) => {
      state.filterList = getFilterList(action.payload.places, action.payload.filter)
    },
    setFilteredPlaces: (state, action) => {
      state.filteredPlaces = filterItems(action.payload.places, action.payload.filter)
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
