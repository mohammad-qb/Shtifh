import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class updateTimeInOnceDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  start_time!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  end_time!: string;
}
