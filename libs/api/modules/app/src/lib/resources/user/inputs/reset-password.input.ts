import {
  Field,
  InputType
} from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  MinLength
} from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field(()=> String)
  @MinLength(6)
  @IsNotEmpty()
  new_password!: string;
}
