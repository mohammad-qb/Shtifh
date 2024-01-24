import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import CarModelForm from '../../form/car-model/form';
import { CarModelModalProps } from './types/car-model-moda.type';

const CarModalModal = (props: CarModelModalProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={() => props.onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {props.mode === 'create'
            ? 'Create New Car Model'
            : 'Update Car Model'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CarModelForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CarModalModal;
