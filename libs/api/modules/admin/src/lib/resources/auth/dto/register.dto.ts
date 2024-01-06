import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  full_name!: string;

  @IsString()
  @IsNotEmpty()
  mobile!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
