import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCityDro implements Prisma.CityUncheckedUpdateInput {
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

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
