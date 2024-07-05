import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCarDto
  implements Omit<Prisma.CarUncheckedUpdateInput, 'customerId'>
{
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carBrandId!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carId!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  plate?: string | null | undefined;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carModelId!: string;

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
