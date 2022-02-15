import React, { createElement } from 'react'
import { useState } from 'react'
import styles from './ConfirmAction.module.scss'
import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal'

const ConfirmAction = ({ showDialog, action, text, children, tag, ...rest }) => {
  const [open, setOpen] = useState(false)

  const confirm = () => {
    action()
    setOpen(false)
  }

  const checkCondition = () => {
    if (showDialog) {
      setOpen(true)
    } else {
      action()
    }
  }

  const Child = createElement(tag, {
    onClick: checkCondition,
    ...rest,
  }, children)

  return (
    <>
      {Child}

      <Modal open={open} setOpen={() => setOpen(false)}>
        <div className={styles.modal}>
          <h3 className={styles.title}>{text}</h3>

          <div className={styles.actions}>
            <Button text="Подтвердить" onClick={confirm} />
            <Button text="Отмена" onClick={() => setOpen(false)} />
          </div>
        </div>
      </Modal>
    </>
  )
}

ConfirmAction.defaultProps = {
  text: 'Вы действительно хотите подтвердить действие?',
  tag: 'div',
  showDialog: true,
  action: () => { }
}

export default ConfirmAction
