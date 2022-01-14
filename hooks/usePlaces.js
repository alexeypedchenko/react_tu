import { useEffect } from 'react'
import { useActions, useAppSelector } from './useStore'
import { selectPlace } from '../store/reducers/place/placeSlice'

export const usePlaces = () => {
  const { filter, places } = useAppSelector(selectPlace)
  const { fetchPlaces, setFilteredPlaces, setFilterList } = useActions()

  useEffect(() => {
    fetchPlaces()
  }, [])

  useEffect(() => {
    setFilteredPlaces({ places, filter })
    setFilterList({ places, filter })
  }, [places])
}
