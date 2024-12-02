import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class AdminFindAgentInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  agentId!: string;
}
