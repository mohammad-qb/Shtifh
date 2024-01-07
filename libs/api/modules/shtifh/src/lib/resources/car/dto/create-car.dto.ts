import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import {
  IsEnum,
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
  plate?: string | null | undefined;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model!: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  year?: number | undefined;

  @ApiPropertyOptional({
    enum: $Enums.CarType,
  })
  @IsEnum($Enums.CarType)
  @IsOptional()
  type?: $Enums.CarType | undefined;

  @ApiPropertyOptional({
    enum: $Enums.CarColor,
  })
  @IsEnum($Enums.CarColor)
  @IsOptional()
  color?: $Enums.CarColor | undefined;
}
