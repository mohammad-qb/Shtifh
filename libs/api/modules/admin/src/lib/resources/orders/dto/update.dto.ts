import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  employeeId?: string;
}
