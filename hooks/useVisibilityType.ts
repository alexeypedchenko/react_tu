import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/functions";

const visibilityTypes: {[key: string]: string} = {
  map: 'Карта /\\/',
  grid: 'Сетка #'
}

export const useVisibilityType = (hash = '') => {
  const [visibilityType, setVisibilityType] = useState<string>('map');
  const value = `${hash}_visibilityType`

  // useEffect(() => {
  //   const localType = getLocalStorage(value)
  //   if (localType) {
  //     setVisibilityType(localType)
  //   } else {
  //     setLocalStorage(value, visibilityType)
  //   }
  //   return () => {}
  // }, [])

  // useEffect(() => {
  //   setLocalStorage(value, visibilityType)
  //   return () => {}
  // }, [visibilityType])

  return {
    visibilityType,
    visibilityTypes,
    setVisibilityType
  }
}
