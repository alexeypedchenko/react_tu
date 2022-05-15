import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getDbDocsByOrder,
  getDbDoc
} from '../../../firebase/firebaseFirestore'

const collectionName = 'pages'

export const fetchPages = createAsyncThunk(
  'pages/fetchPages',
  async () => getDbDocsByOrder(collectionName).then((docs) => docs)
)

export const fetchPage = createAsyncThunk(
  'pages/fetchPage',
  async (id) => getDbDoc(collectionName, id).then((doc) => doc)
)

const allAsyncThunks = {
  fetchPages,
  fetchPage,
}

export default allAsyncThunks
