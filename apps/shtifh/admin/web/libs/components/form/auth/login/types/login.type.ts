import { FormikErrors, FormikTouched } from 'formik';
import { ObjectSchema } from 'yup';

//* shared */
export type LoginFields = {
  email: string;
  password: string;
};

//* comp props */
export type FormikLoginErrors = FormikErrors<LoginFields>;

export type FormikLoginTouched = FormikTouched<LoginFields>;

export interface LoginFormProps {
  errors: FormikLoginErrors;
  touched: FormikLoginTouched;
  loading: boolean;
}

//* dto */
export type SchemaLoginProps = ObjectSchema<LoginFields>;
