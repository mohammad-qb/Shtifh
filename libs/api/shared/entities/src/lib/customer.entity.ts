import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '@prisma/client';
import { UserEntity } from './user.entity';
import { CarEntity } from './car.entity';
import { OrderEntity } from './order.entity';

export class CustomerEntity implements Customer {
  @ApiProperty()
  id!: string;

  @ApiProperty({ nullable: true })
  image_url!: string | null;

  @ApiProperty()
  user!: UserEntity;

  @ApiProperty()
  cars!: CarEntity[];

  @ApiProperty()
  orders!: OrderEntity[];

  @ApiProperty()
  userId!: string;
}
