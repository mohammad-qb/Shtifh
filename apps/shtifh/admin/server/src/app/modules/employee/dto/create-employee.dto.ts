import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto
  implements Omit<Prisma.EmployeeUncheckedCreateInput, 'userId'>
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  salary!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  start_date!: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  work_days?: number | undefined;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobile!: string;


  @IsOptional()
  wallet!: string;
}
