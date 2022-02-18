import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
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
    [fetchRoutes.pending.type]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchRoutes.fulfilled.type]: (state, action) => {
      state.load = false
      state.routes = action.payload
    },
    [fetchRoutes.rejected.type]: (state, action) => {
      state.load = false
      state.routes = []
      state.error = action.error.message
    },

    // load: false,
    // error: '',
    [fetchRoute.pending.type]: (state, action) => {
      state.load = true
      state.error = ''
    },
    [fetchRoute.fulfilled.type]: (state, action) => {
      state.load = false
      state.routes.push(action.payload)
    },
    [fetchRoute.rejected.type]: (state, action) => {
      state.load = false
      state.error = action.error.message
    },
  }
})

export const routeActions = { ...routeSlice.actions, ...allThunks }
export const selectRoute = (state: RootState) => state.route
export default routeSlice.reducer
