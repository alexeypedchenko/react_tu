/* eslint-disable */
import { Loader } from '@googlemaps/js-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus'

import {
  infoWindowTemplate,
  MAP_STYLES_DARK,
  MAP_STYLES_WHITE,
} from './utils'

export class GoogleMap {
  constructor(selector, { onMarkerHover, onMarkerClick} = {}) {
    this.loader = new Loader({
      apiKey: 'AIzaSyBOMQAKjVaaYfe_fSHNn3CBFcbNS651GnA',
      version: 'weekly',
    })

    this.map = null
    this.mapContainer = document.querySelector(selector)

    this.mapOptions = {
      // styles: MAP_STYLES_DARK,
      zoom: 6,
      center: {
        lat: 49.30881846,
        lng: 30.53801849,
      },
      clickableIcons: false, // клик на объекты карты и видеть информацию о них
      // disableDefaultUI: true, // выключить все элементы элементы управления картой
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      scrollwheel: true, // возможность масштабировать карту мышкой или тачпадом
    }
    this.markers = []
    this.infoWindows = []
    // this.pin = pin

    this.route = null
    this.circle = null
    this.cluster = null

    this.onMarkerHover = onMarkerHover
    this.onMarkerClick = onMarkerClick
  }

  setMarkers(markers = []) {
    // очищаем маркеры
    this.clearMarkers()

    markers.forEach((markerData, index) => {
      // создаем маркер
      const marker = this.createMarker(markerData)
      // добавляем маркер в массив
      this.markers.push(marker)
      // добавляем новую позицию маркера для центрирования карты
      if (this.cluster) this.cluster.setPoint(markerData)
      // создаем модальное окно маркера
      this.createInfoWindow(markerData)
      // Добавляем события
      this.addMarkerListeners(marker, index)
    })

    // группируем маркеры в класстере
    if (this.cluster) this.cluster.group(this.markers)
    this.centeredMap()
  }

  createMarker(marker, showOnMap = false) {
    const options = {
      position: {
        lat: +marker.coordinates.lat,
        lng: +marker.coordinates.lng,
      },
      zIndex: 10,
      // https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
      // icon: {
      //   url: marker.icon || this.pin,
      //   size: new google.maps.Size(30, 30),
      //   // если изображение меньше или больше 30px, масштабируем до 30
      //   scaledSize: new google.maps.Size(30, 30),
      // },
      // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
      // label: {
      //   text: marker.name,
      //   color: 'black',
      //   fontFamily: 'Arial',
      //   fontSize: '16',
      //   fontWeight: '700',
      //   className: 'custom-label-class',
      // },
    }

    if (showOnMap) {
      options.map = this.map
    }

    const newMarker = new google.maps.Marker(options)

    return newMarker
  }

  // если маркеры сгруппированы в кластер
  // при наведении на внешний объект, можно создать
  // и отобразить маркер связанный с внешним объектом
  // после чего, удалить маркер
  handleCreateMarker(data) {
    const showOnMap = true
    const marker = this.createMarker(data, showOnMap)
    marker.setZIndex(9)
    this.markers.push(marker)
    this.circle.show(marker)
  }
  removeLastMarker() {
    this.markers[this.markers.length - 1].setMap(null)
    this.circle.hide()
  }

  centeredMap() {
    this.closeAllInfoWindows()

    // центрируем карту относительно всех маркеров
    if (this.markers.length > 1) {
      this.map.fitBounds(this.cluster.bounds)
      this.rebotMapZoom()
      return
    }

    // Центрируем карту относительно одного маркера
    if (this.markers.length === 1) {
      this.map.setCenter(this.markers[0].getPosition())
      this.map.setZoom(10)
      return
    }

    // если маркеров нет, сбрасываем центр в исходную позицию
    if (this.map) {
      this.map.setCenter(this.mapOptions.center)
      this.map.setZoom(this.mapOptions.zoom)
    }
  }

  rebotMapZoom() {
    // после обновление маркеров с 0 до n, они группируються в одном класстере
    // сбрасываем зюм для предотарвщения группировки
    const mapZoom = this.map.getZoom()
    this.map.setZoom(mapZoom - 1)
    setTimeout(() => {
      this.map.setZoom(mapZoom)
    }, 0)
  }

  createInfoWindow(markerData) {
    // добавляем модальное окно
    // infoWindowTemplate = шаблон модального окна карты в строковом формате
    const modalTemplate = infoWindowTemplate(markerData)
    const infoWindow = new google.maps.InfoWindow({content: modalTemplate})
    this.infoWindows.push(infoWindow)
  }

  addMarkerListeners(marker, index) {
    marker.addListener('click', () => {
      // this.toggleInfoWindow(marker, index)
      if (typeof this.onMarkerClick === 'function') {
        this.onMarkerClick(index)
      }
    })
    marker.addListener('mouseover', () => {
      this.circle.show(marker)
      if (typeof this.onMarkerHover === 'function') {
        this.onMarkerHover(index)
      }
    })
    marker.addListener('mouseout', () => {
      this.circle.hide()
      if (typeof this.onMarkerHover === 'function') {
        this.onMarkerHover(null)
      }
    })
  }

  addMapListeners() {
    this.map.addListener('click', () => {
      this.closeAllInfoWindows()
    })
  }

  toggleInfoWindow(marker, index) {
    if (this.infoWindows[index].getMap()) {
      this.infoWindows[index].close()
    } else {
      this.closeAllInfoWindows()
      this.infoWindows[index].open(this.map, marker)
      // Центрируем карту относительно нужного маркера
      // this.map.setCenter(marker.getPosition())
      // приближаем карту
      // this.map.setZoom(10)
    }
  }

  closeAllInfoWindows() {
    this.infoWindows.forEach((_, index) => {
      this.infoWindows[index].close()
    })
  }

  clearMarkers() {
    if (this.cluster) this.cluster.clear()
    if (this.route) this.route.clear()

    this.markers.forEach((marker, index) => {
      this.markers[index].setMap(null)
    })
    this.markers = []
    this.infoWindows = []
  }

  // имитация экшинов по меркеру с внешних методов
  handleClickMarker(index) {
    const marker = this.markers[index]
    this.toggleInfoWindow(marker, index)

    // имитируем клик по маркеру
    // WARNING: имитирование клика вызывает функцию callback после клика на маркер
    // google.maps.event.trigger(marker, 'click')
    // this.map.setCenter(marker.getPosition())
    // this.map.setZoom(16)
  }
  handleMarkerMouseover(index) {
    // Реализовать подсветку маркера
    google.maps.event.trigger(this.markers[index], 'mouseover')
  }
  handleMarkerMouseout(index) {
    google.maps.event.trigger(this.markers[index], 'mouseout')
  }

  init() {
    return new Promise((resolve, reject) => {
      this.loader
        .load()
        .then(() => {
          this.map = new google.maps.Map(this.mapContainer, this.mapOptions)
          this.addMapListeners()
          this.circle = new Circle(this.map)
          this.route = new Route(this.map)
          this.cluster = new Cluster(this.map)
          return resolve()
        })
        .catch((error) => {
          console.log('GoogleMap init error:', error)
          return reject()
        })
    })
  }
}

class Cluster {
  constructor(map) {
    this.markerCluster = null
    this.bounds = null
    this.map = map
  }

  group(markers) {
    // группируем маркеры
    this.markerCluster = new MarkerClusterer(this.map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    })
  }

  // добавляем новую позицию маркера для центрирования карты
  setPoint(item) {
    this.init()
    this.bounds.extend({
      lat: +item.coordinates.lat,
      lng: +item.coordinates.lng,
    })
  }

  clear() {
    if (this.markerCluster !== null) {
      this.bounds = null
      this.markerCluster.clearMarkers()
    }
  }

  init() {
    // переменная для определения границ маркеров
    if (this.bounds === null) {
      this.bounds = new google.maps.LatLngBounds()
    }
  }
}

class Route {
  constructor(map) {
    this.directionsService = null
    this.directionsRenderer = null
    this.map = map
    this.init()
  }

  draw(waypts = []) {
    if (!waypts.length) {
      return
    }

    // для отрисовки маршрута, точек на карте должно быть больше 2 и более
    if (waypts.langth < 2) return

    // связать маршрут с картой
    this.directionsRenderer.setMap(this.map)

    waypts = waypts.map((waypt) => {
      return this.createWaypoint(waypt)
    })

    const request = {
      origin: waypts[0].location, // определяем стартовую точку
      destination: waypts[waypts.length - 1].location, // определяем конечную точку
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }

    // определяем промежуточные точки
    if (waypts.length > 2) {
      request.waypoints = waypts.splice(1, waypts.length - 2)
    }

    this.directionsService.route(request, (response, status) => {
      if (status === "OK" && response) {
        this.directionsRenderer.setDirections(response)
      } else {
        window.alert("Directions request failed due to " + status);
      }
    })
  }

  createWaypoint(marker) {
    const lat = marker.coordinates ? +marker.coordinates.lat : marker.getPosition().lat()
    const lng = marker.coordinates ? +marker.coordinates.lng : marker.getPosition().lng()
    // https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsWaypoint
    return {
      location: new google.maps.LatLng(lat, lng),
      stopover: false,
    }
  }

  clear() {
    this.directionsRenderer.setMap(null)
  }

  init() {
    this.directionsService = new google.maps.DirectionsService()
    // https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // Подавить рендеринг маркеров.
      preserveViewport: true, // Отменить центрирование карты относительно маршрута
      // https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions
      // polylineOptions: {
      //   strokeColor: 'blue',
      //   zIndex: 1,
      // }
    })
  }
}

class Circle {
  constructor(map) {
    this.options = {
      zIndex: 2,
      visible: false,
      position: {
        lat: 46.64288927,
        lng: 31.07230514,
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'green',
        fillOpacity: 0.15,
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        scale: 20,
        anchor: new google.maps.Point(0, 0.8),
        zIndex: 2
      },
      map: map
    }

    this.circle = new google.maps.Marker(this.options)
  }

  show(marker) {
    const position = marker.getPosition()
    this.circle.setPosition(position)
    this.circle.setVisible(true)
  }

  hide() {
    this.circle.setVisible(false)
  }
}