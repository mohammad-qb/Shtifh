import { Field, InputType } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class AgentCancelCarOrderInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  carOrderId!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  reason!: string;
}
