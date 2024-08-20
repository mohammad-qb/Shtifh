import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpcomingDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  date?: string;
}
