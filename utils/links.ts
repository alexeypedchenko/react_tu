export interface ILink {
  name: string;
  path: string;
}

export const paths: { [key: string]: string } = {
  home: '/',
  places: '/places',
  routes: '/routes',

  // profile
  profile: '/profile',
  favoritePlaces: '/profile/favorite-places',
  favoriteRoutes: '/profile/favorite-routes',
  customRoutes: '/profile/custom-routes'
}

export const links: ILink[] = [
  { name: 'Главная', path: paths.home },
  { name: 'Места', path: paths.places },
  { name: 'Маршруты', path: paths.routes },
]

export const profileLinks: ILink[] = [
  { name: 'Профиль', path: paths.profile },
  { name: 'Избранные места', path: paths.favoritePlaces },
  { name: 'Избранные маршруты', path: paths.favoriteRoutes },
  { name: 'Пользовательские маршруты', path: paths.customRoutes },
]
