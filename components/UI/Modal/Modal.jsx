import React from 'react';
import { createPortal } from 'react-dom'
import styles from './Modal.module.scss'

const Modal = ({ open, setOpen, children }) => {
  const handleClick = (event) => {
    event.stopPropagation()
    setOpen()
  }

  return open ? createPortal(
    <div className={styles.modal} onClick={handleClick}>
      <div className={styles.body} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.querySelector("#portal-modal")
  ) : null;
};

Modal.defaultProps = {
  open: false,
  setOpen: () => { }
}

export default Modal;
