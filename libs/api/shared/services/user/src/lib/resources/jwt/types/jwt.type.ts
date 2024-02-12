import { $Enums } from '@prisma/client';

export type Payload = {
  id: string;
  email: string;
  full_name: string;
  role: $Enums.Role;
  userId: string;
};
