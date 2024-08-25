import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, Matches } from 'class-validator';

export class ListSlotsDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  cityId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
  date!: string;
}
