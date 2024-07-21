import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { CarEntity } from './car.entity';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

export class CustomerEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  gender!: $Enums.Gender;

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
