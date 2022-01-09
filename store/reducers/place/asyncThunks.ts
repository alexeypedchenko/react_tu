import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../../../utils/api'

export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async () => fetch(API_URL.places)
    .then((res) => res.json())
    .then((data) => data)
)

const allAsyncThunks = {
  fetchPlaces,
}

export default allAsyncThunks
