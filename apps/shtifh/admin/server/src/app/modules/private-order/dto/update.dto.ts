import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdatePrivateOrderDto {
  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  employeeId?: string;
}
