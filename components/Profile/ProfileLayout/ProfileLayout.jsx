import React, { useEffect } from 'react'
import styles from './ProfileLayout.module.scss'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/reducers/user/userSlice'
import ProfileAside from '../ProfileAside/ProfileAside'

const ProfileLayout = ({ children, title }) => {
  const { isAuth } = useSelector(selectUser)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth])

  return (
    <div className={styles.layout}>
      <ProfileAside />
      <div className={styles.main}>
        {title && (<h1 className={styles.title}>{title}</h1>)}
        {children}
      </div>
    </div>
  )
}

ProfileLayout.defaultProps = {
  title: '',
}

export default ProfileLayout