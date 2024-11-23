import {
  Field,
  InputType
} from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString
} from 'class-validator';

@InputType()
export class VerifyResetPasswordOtpInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field(() => String)
  @IsNumberString()
  @IsNotEmpty()
  reset_password_code!: string;
}
