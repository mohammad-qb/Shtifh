import { Field, InputType, Int } from '@nestjs/graphql';
import { PaymentMethod } from '@shtifh/helpers';
import { IsEnum, IsInt, IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class ConfirmExpressCarWashOrderInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  expressCarWashOrderId!: string;

  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  agentId!: string;

  @Field(() => String)
  @IsInt()
  @IsNotEmpty()
  tips!: number;

  @Field(() => Int)
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment_method!: PaymentMethod;
}
