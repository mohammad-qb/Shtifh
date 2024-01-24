import { FormikErrors, FormikTouched } from 'formik';
import { ObjectSchema } from 'yup';

//* shared */
export type CarModalFields = {
  name_en: string;
  name_ar: string;
  name_he: string;
};

//* comp props */
export type FormikCarModelErrors = FormikErrors<CarModalFields>;

export type FormikCarModelTouched = FormikTouched<CarModalFields>;

export interface CarModelFormProps {
  errors: FormikCarModelErrors;
  touched: FormikCarModelTouched;
  loading: boolean;
}

//* dto */
export type CarModelDtoProps = ObjectSchema<CarModalFields>;
