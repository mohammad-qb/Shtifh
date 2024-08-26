import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddPricePrivateOrderDto {
  @ApiPropertyOptional()
  @IsInt()
  @IsNotEmpty()
  price?: number;
}
