import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AgentCancelExpressCarWashOrderInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  expressCarWashOrderId!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  reason!: string;
}
