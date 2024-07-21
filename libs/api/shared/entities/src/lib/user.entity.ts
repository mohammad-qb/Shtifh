import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { CustomerEntity } from './customer.entity';
import { EmployeeEntity } from './employee.entity';

export class UserEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  full_name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  mobile!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty()
  reset_password_code!: string | null;

  @ApiProperty({ enum: $Enums.Role })
  role!: $Enums.Role;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty()
  customer!: CustomerEntity;

  @ApiProperty()
  employee!: EmployeeEntity;
}
