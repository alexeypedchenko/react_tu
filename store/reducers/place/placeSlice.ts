import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
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
    [fetchPlaces.pending.type]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchPlaces.fulfilled.type]: (state, action) => {
      state.load = false
      state.places = action.payload
    },
    [fetchPlaces.rejected.type]: (state, action) => {
      state.load = false
      state.places = []
      state.error = action.error.message
    },

    // load: false,
    // error: '',
    [fetchPlace.pending.type]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchPlace.fulfilled.type]: (state, action) => {
      state.load = false
      state.places.push(action.payload)
    },
    [fetchPlace.rejected.type]: (state, action) => {
      state.load = false
      state.error = action.error.message
    },
  }
})

export const placeActions = { ...placeSlice.actions, ...allThunks }
export const selectPlace = (state: RootState) => state.place
export default placeSlice.reducer
