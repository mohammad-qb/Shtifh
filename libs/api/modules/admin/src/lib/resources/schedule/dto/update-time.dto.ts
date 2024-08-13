import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateTimeInOnceDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  start_time?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  end_time?: string;
}
