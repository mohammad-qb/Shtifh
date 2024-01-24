import { CarModelModalProps } from '../../../../components/modal/car-modal/types/car-model-moda.type';

export type ModalName = 'CAR_MODEL' | 'CITY' | 'EMPLOYEE' | 'SERVICE';

export type ModalOptions<T extends ModalName> = T extends 'CAR_MODEL'
  ? Pick<CarModelModalProps, 'dataBase' | 'mode'>
  : T extends 'CITY'
  ? any
  : T extends 'EMPLOYEE'
  ? any
  : T extends 'SERVICE'
  ? any
  : never;

export type ModalStateProps = { name: ModalName | null; props: any };

export type ModalContextProps = {
  modalState: ModalStateProps;
  openModal: <T extends ModalName>(name: T, props: ModalOptions<T>) => void;
  closeModal: () => void;
};
