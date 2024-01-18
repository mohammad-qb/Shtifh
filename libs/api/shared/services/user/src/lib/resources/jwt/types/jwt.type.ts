import { $Enums } from '@prisma/client';

export type Payload = {
  id: number;
  email: string;
  full_name: string;
  role: $Enums.Role;
  userId: number;
};
