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

export const setLocalStorage = (name = '', data) => {
  if (!name || !data) return
  localStorage.setItem(name, JSON.stringify(data))
}
export const getLocalStorage = (name = '') => {
  const data = JSON.parse(localStorage.getItem(name))
  return data
}

export const getCountDays = (startDate, endDate) => {
  return Math.ceil(Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24) + 1)
}
