import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreatePrivateOrderDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  private_service_id!: string;
}
