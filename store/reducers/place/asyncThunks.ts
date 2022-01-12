import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDbDocsByOrder } from '../../../firebase/firebaseFirestore'

const collectionName = 'places'

export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async () => getDbDocsByOrder(collectionName).then((docs) => docs)
)

const allAsyncThunks = {
  fetchPlaces,
}

export default allAsyncThunks
