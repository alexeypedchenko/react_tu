import { getUniqueCollection } from './functions'

const IS_ARRAY = true

export const getFilterList = (arr = [], filters = {}) => {
  if (!arr.length) return {}

  // собираем списки фильтров по ключам из списка элементов
  const items = arr
  const filterTypes = Object.keys(filters)
  const filterList = {}

  for(const key of filterTypes) {
    if (key === 'name') {
      continue
    }

    switch (typeof items[0][key]) {
      case 'string':
        filterList[key] = getUniqueCollection(items, key)
        break
      case 'object':
        filterList[key] = getUniqueCollection(items, key, IS_ARRAY)
        break
      default:
        break
    }
  }

  return filterList
}

export const filterItems = (arr = [], filters = {}) => {
  return arr.filter((item) => {
    let condition = true

    for (let [name, value] of Object.entries(filters)) {
      // 1. - если значение фильтра пустое переходим к следующему фильтру.
      if (!value) continue

      let prop = item[name]

      // 2. - если значение фильтра не пустое и объект 'item' по ключу фильтра не имеет вхождений
      // значит условие не соответствует => исключаем объект из фильтра.
      if (
        (name !== 'name' && typeof prop === 'string' && prop !== value)
        || (name !== 'name' && typeof prop === 'object' && !prop.includes(value))
      ) {
        condition = false
      }

      // 3. - Фильтр поиска имеет ключ 'name'
      // приводим поле поиска и поля обьекта к нижнему регистру
      if (name === 'name') {
        value = value.toLowerCase().trim()
        prop = prop.toLowerCase().trim()

        if (!prop.includes(value)) {
          condition = false
        }
      }

      // 4. - примечание!
      // Объект 'item' обязательно должен иметь такие же ключи как и объект 'filters'.
    }

    return condition
  })
}

// old
export const filterFunction = (arr = [], filters = {}) => {
  return arr.filter((item) => {
    let condition = true

    for (let [name, value] of Object.entries(filters)) {
      // 1. - если значение фильтра пустое переходим к следующему фильтру.
      if (!value) continue

      let prop = item[name]

      // 2. - Фильтр поиска имеет ключ 'name'
      // приводим поле поиска и поля обьекта к нижнему регистру
      if (name === 'name') {
        value = value.toLowerCase().trim()
        prop = prop.toLowerCase().trim()
      }

      // 3. - если значение фильтра не пустое и объект 'item' по ключу фильтра не имеет вхождений
      // значит условие не соответствует => исключаем объект из фильтра.
      if (value && !prop.includes(value)) {
        condition = false
        break
      }

      // 3. - примечание!
      // Объект 'item' обязательно должен иметь такие же ключи как и в фильтре.
    }

    return condition
  })
}
