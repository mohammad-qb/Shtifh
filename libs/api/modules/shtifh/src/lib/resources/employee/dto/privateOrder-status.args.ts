import { ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class OrderStatusArgs {
  @ApiPropertyOptional({ enum: $Enums.OrderStatus })
  @IsEnum($Enums.OrderStatus)
  @IsNotEmpty()
  status?: $Enums.OrderStatus;
}
