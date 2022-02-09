import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getDbDoc,
  setDbDoc,
  updateDbDoc,
} from '../../../firebase/firebaseFirestore'

const collectionName = 'users'

const userDefaultData = {
  role: 'user',
  favoritePlaces: [],
}

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (id) => {
  try {
    const userData = await getDbDoc(collectionName, id)
    return userData
  } catch (err) {
    if (err === 'No such document!') {
      try {
        const res = await setDbDoc(collectionName, id, userDefaultData)
        return userDefaultData
      } catch (error) {
        return error
      }
    }
  }
})

export const updateUserData = createAsyncThunk('user/updateUserData', async ({id, data}) => {
  return updateDbDoc(collectionName, id, data)
})

const allAsyncThunks = {
  fetchUserData,
  updateUserData,
}

export default allAsyncThunks
