import { createSlice } from '@reduxjs/toolkit'
import { filterItems, getFilterList } from '../../../utils/filters'
import allThunks, {
  fetchPlaces,
  fetchPlace,
} from './asyncThunks'

const initialState = {
  load: false,
  error: '',
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

    clearError: (state, action) => {
      state.error = ''
    },

    // filter
    setPlaceFilter: (state, action) => {
      const { name, value } = action.payload
      state.filter[name] = value
    },
    setPlaceFilterList: (state, action) => {
      state.filterList = getFilterList(state.places, state.filter)
    },
    setPlaceFilteredPlaces: (state, action) => {
      state.filteredPlaces = filterItems(state.places, state.filter)
    },
  },

  extraReducers: {
    [fetchPlaces.pending]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchPlaces.fulfilled]: (state, action) => {
      state.load = false
      state.places = action.payload
    },
    [fetchPlaces.rejected]: (state, action) => {
      state.load = false
      state.places = []
      state.error = action.error.message
    },

    // load: false,
    // error: '',
    [fetchPlace.pending]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchPlace.fulfilled]: (state, action) => {
      state.load = false
      state.places.push(action.payload)
    },
    [fetchPlace.rejected]: (state, action) => {
      state.load = false
      state.error = action.error.message
    },
  }
})

export const placeActions = { ...placeSlice.actions, ...allThunks }
export const selectPlace = (state) => state.place
export default placeSlice.reducer
