import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Admin } from '@prisma/client';

export class AdminEntity implements Admin {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty()
  full_name!: string;

  @ApiProperty({
    enum: $Enums.Role,
  })
  role!: $Enums.Role;
}
