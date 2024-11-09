import { Field, InputType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @Field(() => String)
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;

  @Field(() => $Enums.Lang)
  @IsEnum($Enums.Lang)
  @IsNotEmpty()
  language!: $Enums.Lang;

  @Field(() => $Enums.Gender)
  @IsEnum($Enums.Gender)
  @IsNotEmpty()
  gender!: $Enums.Gender;
}
