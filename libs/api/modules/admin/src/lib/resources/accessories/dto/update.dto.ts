import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAccessoriesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_en!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_ar!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_he!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image_url!: string;

  @ApiProperty()
  @IsDecimal()
  @IsNotEmpty()
  price!: number;
}
