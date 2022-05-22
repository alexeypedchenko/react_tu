import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useActions } from '../../../hooks/useStore'
import { selectPlace } from '../../../store/reducers/place/placeSlice'
import PlacePage from '../../../components/Place/PlacePage/PlacePage'
import { selectPage } from '../../../store/reducers/page/pageSlice'
import { selectRoute } from '../../../store/reducers/route/routeSlice'
import { useMemo } from 'react'

const Index = () => {
  const router = useRouter()
  const { slug } = router.query
  const { fetchPage } = useActions()
  const { places } = useSelector(selectPlace)
  const { routes } = useSelector(selectRoute)
  const { pages, load, error } = useSelector(selectPage)

  const [place, setPlace] = useState(null)
  const [page, setPage] = useState(null)

  useEffect(() => {
    if (!slug) return
    const pageIndex = pages.findIndex((page) => page.id === slug)
    if (pageIndex !== -1) {
      setPage(pages[pageIndex])
    } else {
      fetchPage(slug)
    }
  }, [slug, pages])

  useEffect(() => {
    if (!slug) return
    const placeIndex = places.findIndex((place) => place.id === slug)
    if (placeIndex !== -1) {
      setPlace(places[placeIndex])
    }

    if (placeIndex === -1 && places.length > 0) {
      console.log('placeIndex === -1 && places.length > 0:')
      router.push('/places')
    }
  }, [slug, places])

  const routesWithPlace = useMemo(() => {
    if (!place || !routes) return []
    return routes.filter((route) => route.places.includes(place.id))
  }, [place, routes])

  return (
    <PlacePage
      place={place}
      page={page}
      routes={routesWithPlace}
    />
  )
}

export default Index
