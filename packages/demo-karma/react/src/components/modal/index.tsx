import * as React from 'react';
import Modal, { ModalFuncProps, destroyFns } from './Modal';
import confirm from './confirm';
//import Icon from '../icon';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

Modal.info = function(props: ModalFuncProps) {
  const config = {
    type: 'info',
    icon: <i className='salus-icon-form-msg' />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.success = function(props: ModalFuncProps) {
  const config = {
    type: 'success',
    icon: <i className='salus-icon-success' />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.error = function(props: ModalFuncProps) {
  const config = {
    type: 'error',
    icon: <i className='salus-icon-error-msg' />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.warning = Modal.warn = function(props: ModalFuncProps) {
  const config = {
    type: 'warning',
    icon: <i className='salus-icon-sign-mark' />,
    okCancel: false,
    ...props,
  };
  return confirm(config);
};

Modal.confirm = function(props: ModalFuncProps) {
  const config = {
    type: 'confirm',
    okCancel: true,
    ...props,
  };
  return confirm(config);
};

Modal.destroyAll = function() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

export default Modal;
