import CarModelsUI from '../../../libs/components/ui/car-model';
import { useModal } from '../../../libs/utils/context/modal';

const CarModelsPage = () => {
  const {openModal} = useModal()
  return <CarModelsUI />;
};

export default CarModelsPage;
