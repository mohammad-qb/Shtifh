import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCarModelDto implements Prisma.CarModelUncheckedUpdateInput {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  cityId?: number;
}
