export const getUniqueCollection = (arr = [], name = '', isArray = false) => {
  const setCollection = new Set()
  arr.forEach((item) => {
    if(!isArray) {
      setCollection.add(item[name])
    } else {
      item[name].forEach((el) => {
        setCollection.add(el)
      })
    }
  })
  return Array.from(setCollection)
}
