import { $Enums } from '@prisma/client';

export type UserPayload = {
  id: string;
  email: string;
  full_name: string;
  role: $Enums.UserRole;
  userId: string;
};
