import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
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

  @ApiProperty({ enum: $Enums.Gender })
  @IsEnum($Enums.Gender)
  @IsNotEmpty()
  readonly gender!: $Enums.Gender;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password!: string;
}
