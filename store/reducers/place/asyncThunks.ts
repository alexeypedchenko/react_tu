import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getDbDocsByOrder,
  getDbDoc
} from '../../../firebase/firebaseFirestore'

const collectionName = 'places'

export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async () => getDbDocsByOrder(collectionName).then((docs) => docs)
)

export const fetchPlace = createAsyncThunk(
  'places/fetchPlace',
  async (id) => getDbDoc(collectionName, id).then((doc) => doc)
)

const allAsyncThunks = {
  fetchPlaces,
  fetchPlace,
}

export default allAsyncThunks
