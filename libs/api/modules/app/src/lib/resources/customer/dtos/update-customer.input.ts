import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateCustomerInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  phone!: string
}
