import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  @IsNotEmpty()
  price!: number;
}
