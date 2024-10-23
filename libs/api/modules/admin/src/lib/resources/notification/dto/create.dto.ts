import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content_en!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content_ar!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content_he!: string;
}

export class CreateSpecificNotificationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content_en!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content_ar!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content_he!: string;
}
