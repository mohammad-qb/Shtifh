import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdatePrivateOrderDto {
  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  employeeId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  time?: string;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @IsOptional()
  price?: number;
}
