import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { CustomerEntity, UserEntity } from '@shtifh/entities';
import { OrdersDataEntity } from '../../orders/entities/list-orders.entity';

class NestedCustomerEntity implements Pick<CustomerEntity, 'image_url'> {
  @ApiProperty({ nullable: true })
  image_url!: string | null;

  @ApiProperty()
  id!: number;

  @ApiProperty({ type: OrdersDataEntity })
  orders!: OrdersDataEntity;
}

export class BaseAuthUserEntity
  implements Pick<UserEntity, 'id' | 'email' | 'full_name' | 'mobile' | 'role'>
{
  @ApiProperty()
  id!: number;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  full_name!: string;

  @ApiProperty()
  mobile!: string;

  @ApiProperty({ enum: $Enums.Role })
  role!: $Enums.Role;

  @ApiProperty()
  customer!: NestedCustomerEntity;
}

export class BaseAuthEntity {
  @ApiProperty({ type: BaseAuthUserEntity })
  user!: BaseAuthUserEntity;

  @ApiProperty()
  token!: string;
}
