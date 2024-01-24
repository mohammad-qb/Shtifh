import { CarModalFields } from '../types/car-model-form';

export const carModelInitValues = (base?: CarModalFields): CarModalFields => ({
  name_ar: base?.name_ar || '',
  name_en: base?.name_en || '',
  name_he: base?.name_he || '',
});
