import { initApp } from './firebase'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from 'firebase/firestore'
initApp()
const db = getFirestore()

const formatTimestampToDate = (prop) => {
  return `${prop.toDate()}`
}

export const addDbDoc = (collectionName, doc) => new Promise(async (res, rej) => {
  // serverTimestamp
  doc.createdAt = new Date().toLocaleString('uk-Ua')
  doc.changedAt = new Date().toLocaleString('uk-Ua')
  try {
    const docRef = await addDoc(collection(db, collectionName), doc)
    console.log("Document written with ID: ", docRef.id)
    res(docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
    rej(e)
  }
})

export const setDbDoc = async (collectionName, docId, docData) => new Promise(async (res, rej) => {
  docData.createdAt = new Date().toLocaleString('uk-Ua')
  docData.changedAt = new Date().toLocaleString('uk-Ua')
  try {
    await setDoc(doc(db, collectionName, docId), docData)
    res(true)
  } catch (error) {
    rej(`doc ${docId} not created`)
  }
})

export const getDbDoc = (collectionName, docId) => new Promise(async (res, rej) => {
  const docRef = doc(db, collectionName, docId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const docData = docSnap.data()
    res({ id: docId, ...docData })
  } else {
    // doc.data() will be undefined in this case
    // console.log()
    rej("No such document!")
  }
})
export const updateDbDoc = (collectionName, docId, docData) => new Promise(async (res, rej) => {
  docData.changedAt = new Date().toLocaleString('uk-Ua')
  const docRef = doc(db, collectionName, docId)
  try {
    await updateDoc(docRef, docData)
    res(docData)
  } catch (error) {
    console.log('error:', error)
    rej(error)
  }
})
export const deleteDbDoc = (collectionName, docId) => new Promise(async (res, rej) => {
  console.log('collectionName:', collectionName)
  console.log('docId:', docId)
  try {
    await deleteDoc(doc(db, collectionName, docId))
    res(docId)
  } catch (error) {
    console.log('error:', error)
    rej(error)
  }
})
export const getDbDocs = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data())
  })
}
export const getDbDocsByOrder = (
  collectionName,
  orderField = 'createdAt',
  desc = true
) => new Promise(async (res, rej) => {
  // "asc" - ASC (ASCENDING - дословно "по возрастанию")
  // "desc" - DESC (DESCENDING - дословно "по убыванию")

  try {
    const sortDirection = desc ? 'desc' : 'asc'
    const collectionRef = collection(db, collectionName)
    const biggerThanSf = query(collectionRef, orderBy(orderField, sortDirection))
    const querySnapshot = await getDocs(biggerThanSf)
    const docs = []
    querySnapshot.forEach((doc) => {
      const docData = doc.data()
      docs.push({
        id: doc.id,
        ...docData,
      })
    })
    res(docs)
  } catch (err) {
    console.log('err:', err)
    rej(err)
  }
})

export const getDbDocsByField = (
  collectionName = null,
  field = null,
  value = null
) => new Promise(async (res, rej) => {
  if (collectionName === null || field === null || value === null) {
    rej('Заполните все поля для получения коллекции!')
  }
  try {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    const docs = []
    querySnapshot.forEach((doc) => {docs.push({id: doc.id, ...doc.data()})})
    res(docs)
  } catch (err) {
    console.log('err:', err)
    rej(err)
  }
})

export default db
