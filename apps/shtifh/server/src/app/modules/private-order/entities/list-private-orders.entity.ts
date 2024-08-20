import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

class PrivateOrderData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  createdAt!: string;
}
export class ListPrivateOrdersEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  time!: string;

  @ApiProperty()
  date!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty({ enum: $Enums.OrderStatus })
  status!: $Enums.OrderStatus;

  @ApiProperty({ type: PrivateOrderData })
  private_service!: PrivateOrderData;
}
