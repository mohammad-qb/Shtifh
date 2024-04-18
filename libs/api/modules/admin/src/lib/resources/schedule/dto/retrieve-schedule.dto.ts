import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNotEmpty } from 'class-validator';

export class RetrieveScheduleDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  year!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  month!: number;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;
}
