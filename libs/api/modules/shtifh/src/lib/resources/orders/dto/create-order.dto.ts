import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsInt()
  @IsNotEmpty()
  carId!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cityId!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  carModelServiceId!: number;
}
