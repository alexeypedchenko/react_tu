import React from 'react'
import { useRouter } from 'next/router'
import styles from './Button.module.scss'
import Image from 'next/image'

const Button = ({ icon, text, push, onClick }) => {
  const router = useRouter()

  const handleClick = () => {
    if (push) {
      router.push(push)
    } else {
      onClick()
    }
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      {icon && <Image alt="icon" width={24} height={24} src={icon} />}
      {text}
    </button>
  )
}

Button.defaultProps = {
  text: 'Кнопка',
  icon: null,
  push: null,
  onClick: () => {},
}

export default Button