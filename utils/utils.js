export const arrayOfObj = (obj, count = 9) => {
  return [...Array(count)].map((_, index) => {
    obj = JSON.parse(JSON.stringify(obj))
    if (obj.hasOwnProperty('coordinates')) {
      obj.coordinates.lat -= (Math.random() / 100)
      obj.coordinates.lng -= (Math.random() / 100)
    }
    return {
      ...obj,
      _id: `${obj._id}_${index}`,
      name: `${obj.name} ${index}`
    }
  })
}
