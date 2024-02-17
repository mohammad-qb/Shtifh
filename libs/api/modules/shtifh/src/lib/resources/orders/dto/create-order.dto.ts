import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @ApiPropertyOptional({ default: '10/10/2022:13:55:10' })
  @IsString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ default: '12:00:00' })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string | null | undefined;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carId!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  carModelServiceId!: string;

  @ApiPropertyOptional()
  @IsEnum([0, 10, 20, 30, 40, 50])
  @IsOptional()
  tip!: number;
}
