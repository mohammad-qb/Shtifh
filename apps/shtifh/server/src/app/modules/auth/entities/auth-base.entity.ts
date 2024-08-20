import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { CustomerEntity, UserEntity } from '@shtifh/entities';

class NestedCustomerEntity implements Pick<CustomerEntity, 'image_url'> {
  @ApiProperty({ nullable: true })
  image_url!: string | null;

  @ApiProperty()
  id!: number;
}

export class BaseAuthUserEntity
  implements Pick<UserEntity, 'id' | 'email' | 'full_name' | 'mobile' | 'role'>
{
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  full_name!: string;

  @ApiProperty()
  mobile!: string;

  @ApiProperty({ enum: $Enums.Lang })
  lang!: $Enums.Lang;

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
