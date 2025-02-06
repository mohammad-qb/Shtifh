import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class AgentCompleteExpressCarWashOrderInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  expressCarWashOrderId!: string;
}
