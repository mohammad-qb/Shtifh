import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateOrderDto {
  @ApiPropertyOptional({ default: '2024-08-21' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
  @IsOptional()
  date!: string;

  @ApiPropertyOptional({ default: '12:00:00' })
  @IsString()
  @IsOptional()
  time!: string;

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

  @ApiPropertyOptional()
  @IsMongoId({ each: true })
  @IsArray()
  accessoriesIds!: [];

  @ApiPropertyOptional()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  lat_lng?: string[];
}
