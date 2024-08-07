import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly full_name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly mobile!: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  readonly cityId!: string;

  @ApiProperty({ enum: $Enums.Gender })
  @IsEnum($Enums.Gender)
  @IsNotEmpty()
  readonly gender!: $Enums.Gender;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password!: string;

  @ApiProperty({ enum: $Enums.Lang })
  @IsEnum($Enums.Lang)
  @IsNotEmpty()
  lang!: $Enums.Lang;
}
