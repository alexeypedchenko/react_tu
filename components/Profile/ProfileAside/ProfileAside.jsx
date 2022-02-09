import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './ProfileAside.module.scss'
import { profileLinks } from '../../../utils/links'

const ProfileAside = () => {
  const { pathname } = useRouter()

  return (
    <div className={styles.aside}>
      {profileLinks.map((link, idx) => (
        <Link key={idx} href={link.path}>
          <a className={`${styles.link} ${pathname === link.path ? styles.activeLink : ''}`}>
            {link.name}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default ProfileAside