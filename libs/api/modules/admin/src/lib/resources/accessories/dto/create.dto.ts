import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccessoriesDto {
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
