import { object, string } from 'yup';
import { CarModelDtoProps } from '../types/car-model-form';

export const carModelDto: CarModelDtoProps = object().shape({
  name_ar: string().required(),
  name_en: string().required(),
  name_he: string().required(),
});
