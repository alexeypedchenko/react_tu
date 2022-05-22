import React, { useState } from 'react'
import { signin, GoogleLogin } from '../../firebase/firebaseAuth'
import styles from './Signin.module.scss'

const Signin = () => {
  const [fields, setFields] = useState({
    email: '',
    password: ''
  })

  const submit = () => signin(fields)

  return (
    <div className={styles.signin}>
      <input
        className="input"
        type="email"
        value={fields.email}
        placeholder="email"
        onChange={(event) => setFields({ ...fields, email: event.target.value })}
      />
      <input
        className="input"
        type="text"
        value={fields.password}
        placeholder="password"
        onChange={(event) => setFields({ ...fields, password: event.target.value })}
      />
      <button className="btn" onClick={submit}>
        Войти
      </button>
      <button className="btn" onClick={GoogleLogin}>
        Google Login
      </button>
    </div>
  )
}

export default Signin
