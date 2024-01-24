'use client';
import React, { ReactNode, createContext, useContext, useState } from 'react';
import {
  ModalContextProps,
  ModalName,
  ModalOptions,
  ModalStateProps,
} from './types/modal.types';
import { useDisclosure } from '@chakra-ui/react';

export const ModalContext = createContext<ModalContextProps>({
  modalState: { name: null, props: {} },
  closeModal: () => null,
  openModal: () => null,
});

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalState, setModalState] = useState<ModalStateProps>({
    name: null,
    props: {},
  });

  function openModal<T extends ModalName>(name: T, props: ModalOptions<T>) {
    onOpen();
    setModalState({ name, props: { ...props, isOpen } });
  }

  const closeModal = () => {
    onClose();
    setModalState({ name: null, props: {} });
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
