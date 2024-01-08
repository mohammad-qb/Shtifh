import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCityDro implements Prisma.CityUncheckedUpdateInput {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;
}
