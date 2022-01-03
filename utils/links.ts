export interface ILink {
  name: string;
  path: string;
}

export const links: ILink[] = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/profile' },
]
