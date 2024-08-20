import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderEntity {
  @ApiProperty()
  url!: string;

  @ApiProperty()
  success!: boolean;
}
