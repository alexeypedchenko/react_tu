import { useEffect } from 'react'
import { useActions, useAppSelector } from './useStore'
import { selectPlace } from '../store/reducers/place/placeSlice'

export const usePlaces = () => {
  const { filter } = useAppSelector(selectPlace)
  const { fetchPlaces, setPlaceFilteredPlaces, setPlaceFilterList } = useActions()

  useEffect(() => {
    fetchPlaces().then(() => {
      setPlaceFilterList()
      setPlaceFilteredPlaces()
    })
  }, [])

  useEffect(() => {
    setPlaceFilteredPlaces()
  }, [filter])
}
