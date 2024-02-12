import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCarModelDto implements Prisma.CarModelUncheckedUpdateInput {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name_ar?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name_en?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name_he?: string;
}
