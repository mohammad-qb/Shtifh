import { Field, InputType, Int } from '@nestjs/graphql';
import { Gender, Language } from '@shtifh/helpers';
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

  @Field(() => Int)
  @IsEnum(Language)
  @IsNotEmpty()
  language!: Language;

  @Field(() => Int)
  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;
}
