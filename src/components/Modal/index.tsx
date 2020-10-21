import React from 'react';
import RModal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';

import './modal.css';

const useStyles = makeStyles(() => ({
  overlay: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    padding: 0,
    outline: 'none',
  }
}));

RModal.setAppElement('#root')

type ModalProps = RModal.Props & {
  children: React.ReactElement;
};

function Modal(props: ModalProps) {
  const classes = useStyles();

  return <RModal
    {...props}
    shouldCloseOnEsc
    closeTimeoutMS={150}
    isOpen={props.isOpen}
    shouldCloseOnOverlayClick
    className={classes.modalContainer}
    overlayClassName={classes.overlay}
  >
    {props.children}
  </RModal>;
}

export default Modal;