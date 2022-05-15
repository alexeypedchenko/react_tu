import { createSlice } from '@reduxjs/toolkit'
import { filterItems, getFilterList } from '../../../utils/filters'
import allThunks, {
  fetchRoutes,
  fetchRoute,
} from './asyncThunks'

const initialState = {
  load: false,
  error: '',
  route: {},
  routes: [],
  filteredRoutes: [],
  filterList: {},
  filter: {
    name: '',
    tags: '',
    region: '',
  }
}

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    // filter
    setRouteFilter: (state, action) => {
      const { name, value } = action.payload
      state.filter[name] = value
    },
    setRouteFilterList: (state, action) => {
      state.filterList = getFilterList(state.routes, state.filter)
    },
    setRouteFilteredRoutes: (state, action) => {
      state.filteredRoutes = filterItems(state.routes, state.filter)
    },
  },

  extraReducers: {
    [fetchRoutes.pending]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchRoutes.fulfilled]: (state, action) => {
      state.load = false
      state.routes = action.payload
    },
    [fetchRoutes.rejected]: (state, action) => {
      state.load = false
      state.routes = []
      state.error = action.error.message
    },

    // load: false,
    // error: '',
    [fetchRoute.pending]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchRoute.fulfilled]: (state, action) => {
      state.load = false
      state.routes.push(action.payload)
    },
    [fetchRoute.rejected]: (state, action) => {
      state.load = false
      state.error = action.error.message
    },
  }
})

export const routeActions = { ...routeSlice.actions, ...allThunks }
export const selectRoute = (state) => state.route
export default routeSlice.reducer
