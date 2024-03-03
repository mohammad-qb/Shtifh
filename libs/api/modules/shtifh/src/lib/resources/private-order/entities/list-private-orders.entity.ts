import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

class PrivateOrderData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  name_he!: string;

  @ApiProperty()
  createdAt!: string;
}
export class ListPrivateOrdersEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: $Enums.OrderStatus })
  status!: $Enums.OrderStatus;

  @ApiProperty({ type: PrivateOrderData })
  private_service!: PrivateOrderData;
}
