import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderEntity {
  @ApiProperty({ nullable: true })
  url?: string | null;

  @ApiProperty()
  success!: boolean;
}
