import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePrivateOrderDto {
  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  employeeId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  time?: string;
}

export class ActivatePrivateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id!: string;
}
