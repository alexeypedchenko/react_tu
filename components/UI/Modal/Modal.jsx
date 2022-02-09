import React from 'react';
import styles from './Modal.module.scss'

const Modal = ({ open, setOpen, children }) => {
  const handleClick = (event) => {
    event.stopPropagation()
    setOpen()
  }

  return (
    <div
      className={`${styles.modal} ${open ? styles.modalOpen : ''}`}
      onClick={handleClick}
    >
      <div className={styles.body} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.defaultProps = {
  open: false,
  setOpen: () => {}
}

export default Modal;
