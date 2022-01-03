import React, { FC, useState } from 'react'
import styles from './Signin.module.scss'

interface UserFields {
  email: string;
  password: string;
}

const Signin: FC = () => {
  const [fields, setFields] = useState<UserFields>({ email: '', password: '' })

  const submit = () => {
    console.log('fields:', fields)
  }

  return (
    <div className={styles.signin}>
      <input
        className="input"
        type="text"
        value={fields.email}
        onChange={(event) => setFields({ ...fields, email: event.target.value })}
      />
      <input
        className="input"
        type="text"
        value={fields.password}
        onChange={(event) => setFields({ ...fields, password: event.target.value })}
      />
      <button className="btn" onClick={submit}>
        Войти
      </button>
    </div>
  )
}

export default Signin
