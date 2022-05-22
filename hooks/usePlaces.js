import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from './useStore'
import { selectPlace } from '../store/reducers/place/placeSlice'

export const usePlaces = () => {
  const { filter } = useSelector(selectPlace)
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
