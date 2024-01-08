import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto implements Prisma.EmployeeUncheckedUpdateInput {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  position?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  salary?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  start_date?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  work_days?: number | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  mobile?: string;
}
