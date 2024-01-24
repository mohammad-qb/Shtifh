import React from 'react';
import { renderModal } from './helper/render-modal';
import { useModal } from '../../../utils/context/modal';

const ModalContainer = () => {
  const {
    modalState: { name, props },
  } = useModal();
  return <>{renderModal(name, props)}</>;
};

export default ModalContainer;
