import { Field, InputType } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty } from "class-validator";

@InputType()
export class DeactivateCarInput {
  @Field(() => String)
  @IsMongoId()
  @IsNotEmpty()
  carId!: string;
}
