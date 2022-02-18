import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getDbDocsByOrder,
  getDbDoc
} from '../../../firebase/firebaseFirestore'

const collectionName = 'routes'

export const fetchRoutes = createAsyncThunk(
  'routes/fetchRoutes',
  async () => getDbDocsByOrder(collectionName).then((docs) => docs)
)

export const fetchRoute = createAsyncThunk(
  'routes/fetchRoute',
  async (id) => getDbDoc(collectionName, id).then((doc) => doc)
)

const allAsyncThunks = {
  fetchRoutes,
  fetchRoute,
}

export default allAsyncThunks
