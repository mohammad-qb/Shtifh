import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

export class EmployeeEntity {
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
