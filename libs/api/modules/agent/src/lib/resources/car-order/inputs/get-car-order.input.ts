import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class AgentGetCarOrderInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  carOrderId!: string;
}
