import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ListPrivateOrdersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date!: string;
}
