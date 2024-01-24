import { CarModelEntity } from '../../../../utils/entities/car-model';

export interface CarModelModalProps {
  mode: 'update' | 'create';
  dataBase?: CarModelEntity;
  isOpen: boolean;
  onClose: any;
}
