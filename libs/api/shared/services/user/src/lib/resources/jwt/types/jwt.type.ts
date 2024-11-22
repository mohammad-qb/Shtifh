import { UserRole } from '@shtifh/helpers';

export type UserPayload = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  userId: string;
};
