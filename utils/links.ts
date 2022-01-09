export interface ILink {
  name: string;
  path: string;
}

export const links: ILink[] = [
  { name: 'Home', path: '/' },
  { name: 'Places', path: '/places' },
  { name: 'Profile', path: '/profile' },
]
