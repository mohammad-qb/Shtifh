import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePrivateServiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_ar!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_en!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name_he!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image_url!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description_ar!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description_en!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description_he!: string;
}

export class ActivatePrivateServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id!: string;
}
