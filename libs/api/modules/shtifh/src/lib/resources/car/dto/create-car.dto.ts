import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCarDto
  implements Omit<Prisma.CarUncheckedCreateInput, 'customerId'>
{
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  building_number?: string | null | undefined;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cityId!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  plate?: string | null | undefined;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  carModelId!: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  year?: number | undefined;

  @ApiPropertyOptional({
    enum: $Enums.CarColor,
  })
  @IsEnum($Enums.CarColor)
  @IsOptional()
  color?: $Enums.CarColor | undefined;
}
