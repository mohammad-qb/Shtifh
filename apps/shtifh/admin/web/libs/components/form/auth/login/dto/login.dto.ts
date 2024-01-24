import { object, string } from 'yup';
import { SchemaLoginProps } from '../types/login.type';

export const loginSchema: SchemaLoginProps = object().shape({
  email: string().email().required(),
  password: string().min(6).required(),
});
