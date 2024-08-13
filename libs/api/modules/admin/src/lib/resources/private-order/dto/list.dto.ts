import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ListPrivateOrdersDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;
}
