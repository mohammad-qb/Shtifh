import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '@prisma/client';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';

export class EmployeeEntity implements Employee {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  position!: string;

  @ApiProperty()
  salary!: number;

  @ApiProperty()
  color!: string;

  @ApiProperty()
  start_date!: string;

  @ApiProperty()
  user!: UserEntity;

  @ApiProperty()
  orders!: OrderEntity[];

  @ApiProperty()
  userId!: string;
}
