import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '@prisma/client';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';

export class EmployeeEntity implements Employee {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  position!: string;

  @ApiProperty()
  salary!: number;

  @ApiProperty()
  color!: string;

  @ApiProperty()
  start_date!: string;

  @ApiProperty()
  work_days!: number;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  user!: UserEntity;

  @ApiProperty()
  orders!: OrderEntity[];
}
