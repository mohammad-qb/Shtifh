import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field(() => String)
  @MinLength(6)
  @IsNotEmpty()
  current_password!: string;

  @Field(() => String)
  @MinLength(6)
  @IsNotEmpty()
  new_password!: string;
}
